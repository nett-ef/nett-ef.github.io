import os

import yaml
from jinja2 import Environment, PackageLoader, select_autoescape

env = Environment(
    loader=PackageLoader("donate-crypto"),
    autoescape=select_autoescape()
)


def get_first_by_key(coin: str, network: str, src: list):
    def key_filter(wallet: dict) -> bool:
        return wallet['coin'] == coin and wallet['network'] == network

    return next(filter(key_filter, src), None)


def get_wallet_id(wallet):
    return f"id-{wallet['coin']}-{wallet['network']}".lower()


def enrich_config(config):
    for w in config['wallets']:
        wid = get_wallet_id(w)
        w['id'] = wid
        print(wid)

        address = w['address']
        w['qr'] = f'qr/{address[:5]}-{address[-5:]}.svg'.lower()

        for row in config['screen']:
            button = get_first_by_key(w['coin'], w['network'], row['row'])
            if button is not None:
                button.update(w)


def main():
    config_file = os.environ['CONFIG']
    with open(config_file, 'rt') as fd:
        config = yaml.safe_load(fd)

    enrich_config(config)
    template = env.get_template('index.jinja')
    htm = template.render(screen=config['screen'])
    with open('index.html', 'w') as fd:
        fd.write(htm)


if __name__ == '__main__':
    main()
