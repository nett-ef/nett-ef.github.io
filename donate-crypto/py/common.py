import os

import yaml


def get_config() -> dict:
    config_file = os.environ['CONFIG']
    with open(config_file, 'rt') as fd:
        return yaml.safe_load(fd)


def get_qr_file_name(address: str) -> str:
    return f'{address[:5]}-{address[-5:]}.svg'.lower()
