## donate-crypto
A crypto donations script for GitHub Pages.

Live: [https://nett-ef.github.io/donate-crypto](https://nett-ef.github.io/donate-crypto)

### How-to make your own page
1. Set wallets in _config.yaml_, replace Google Analytics ID in _templates/index.jinja_
2. Install [Python](https://www.python.org) and [Poetry](https://python-poetry.org)
3. `% poetry install --with=dev`
4. Export environment variables (_local.env.example_)
5. Run _make_qr.py_ followed by _make_index.py_

### Branches
- **main** - live Web page
- **donate-crypto** - clean commit history
