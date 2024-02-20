import os

import yaml
from qrcode import QRCode, constants
from qrcode.image.styles.moduledrawers.svg import SvgPathCircleDrawer
from qrcode.image.svg import SvgPathFillImage

qr_args = {
    'box_size': 4,
    'border': 0,
    'error_correction': constants.ERROR_CORRECT_H
}

qr_style = {
    'image_factory': SvgPathFillImage,
    'module_drawer': SvgPathCircleDrawer()
}


def main():
    config_file = os.environ['CONFIG']
    with open(config_file, 'rt') as fd:
        config = yaml.safe_load(fd)

    for w in config['wallets']:
        address = w["address"]
        qr = QRCode(**qr_args)
        qr.add_data(address)
        qr.make(fit=True)
        img = qr.make_image(**qr_style)
        file_name = f'qr/{address[:5]}-{address[-5:]}.svg'.lower()
        img.save(file_name, 'SVG')


if __name__ == '__main__':
    main()
