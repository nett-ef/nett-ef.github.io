import os

from jinja2 import Environment, select_autoescape, FileSystemLoader

from common import get_config, get_qr_file_name


def get_wallet_id(wallet: dict) -> str:
    return f'id-{wallet["coin"]}-{wallet["network"]}'.lower()


def get_qr_img_src(address: str) -> str:
    qr_dir = os.environ['QR_DIR']
    file_name = get_qr_file_name(address)
    return '/'.join((qr_dir, file_name))


def get_icon_img_src(wallet_id: str) -> str:
    icons_dir = os.environ['ICONS_DIR']
    file_name = f'{wallet_id}.svg'
    return '/'.join((icons_dir, file_name))


def enrich_config_inplace(config: dict):
    wdict = dict()
    for w in config['wallets']:
        wid = get_wallet_id(w)
        w['id'] = wid
        w['icon'] = get_icon_img_src(wid)
        w['qr'] = get_qr_img_src(w['address'])
        wdict[wid] = w

    for row in config['screen']:
        for w in row['row']:
            if w is None:
                continue

            wid = get_wallet_id(w)
            w.update(wdict[wid])


def render_html(config: dict) -> str:
    env = Environment(
        loader=FileSystemLoader(os.environ['TEMPLATES_DIR']),
        autoescape=select_autoescape()
    )

    template = env.get_template('index.jinja')
    return template.render(screen=config['screen'])


def main():
    config = get_config()
    enrich_config_inplace(config)
    html = render_html(config)

    html_dir = os.environ['HTML_OUTPUT_DIR']
    with open(os.path.join(html_dir, 'index.html'), 'w') as fd:
        fd.write(html)


if __name__ == '__main__':
    main()
