import os

from qrcode import QRCode, constants
from qrcode.image.styles.moduledrawers.svg import SvgPathCircleDrawer
from qrcode.image.svg import SvgPathFillImage

from common import get_config, get_qr_file_name


def make_qr_image(address: str):
    qr_args = {
        'box_size': 4,
        'border': 4,
        'error_correction': constants.ERROR_CORRECT_H
    }

    qr_style = {
        'image_factory': SvgPathFillImage,
        'module_drawer': SvgPathCircleDrawer()
    }

    qr = QRCode(**qr_args)
    qr.add_data(address)
    qr.make(fit=True)
    return qr.make_image(**qr_style)


def main():
    config = get_config()
    html_dir = os.environ['HTML_OUTPUT_DIR']
    qr_dir = os.environ['QR_DIR']

    for w in config['wallets']:
        address = w["address"]
        img = make_qr_image(address)
        file_name = get_qr_file_name(address)
        img.save(os.path.join(html_dir, qr_dir, file_name), 'SVG')


if __name__ == '__main__':
    main()
