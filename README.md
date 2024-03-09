## donate-crypto
A crypto donations script for GitHub Pages.

Live: [https://nett-ef.github.io/donate-crypto/](https://nett-ef.github.io/donate-crypto/)

### How-to make your own page
1. Set wallets in _donate-crypto/py/config.yaml_
2. Change header text in _donate-crypto/py/templates/index.jinja_
3. Build and deploy

### Building with CI
1. Fork the repository
2. Run GitHub Actions workflow: donate-crypto

### Building locally
1. Install `pipx`:

    ```
    # MacOS
    % brew install pipx
    % pipx ensurepath
   
    # Ubuntu
    % sudo apt install pipx
    % pipx ensurepath
   
    # Ubuntu LTS
    % python3 -m pip install --user pipx
    % python3 -m pipx ensurepath
    ```
   
2. Install dependencies and build pages:

    ```
    % pipx install poetry
    % poetry install --no-root --only=donate-crypto
    % cd donate-crypto/py
   
    # Export environment variables
    % set -a
    % source local.env
   
    # Make QR codes
    % poetry run python make_qr.py
   
    # Make index.html
    % poetry run python make_index.py
    ```

### Branches
- **donate-crypto** - stable
