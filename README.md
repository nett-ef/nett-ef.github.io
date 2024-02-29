## donate-crypto
A crypto donations script for GitHub Pages.

Live: [https://www.darksciencelabs.com/donate-crypto/](https://www.darksciencelabs.com/donate-crypto/)

### How-to make your own page
1. Install [Poetry](https://python-poetry.org)
2. `% poetry install --no-root --only=donate-crypto`
3. `% cd donate-crypto/py`
4. Set wallets in _config.yaml_
5. Export environment variables (_local.env_)
6. Run _make_qr.py_ followed by _make_index.py_

### Branches
- **main** - live Web page
- **donate-crypto** - clean commit history
