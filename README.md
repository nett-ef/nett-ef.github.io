## donate-crypto
A crypto donations script for GitHub Pages.

Live: [https://nett-ef.github.io/donate-crypto/](https://nett-ef.github.io/donate-crypto/)

### How-to make your own page
1. Set wallets in _config.yaml_
2. Change header text in _templates/index.jinja_
3. Build and deploy

### Building with CI
Run GitHub Actions workflow: donate-crypto. This will run _make*_ scripts and commit the changes.

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
   
    # Export environment variables
    % set -a
    % source donate-crypto/py/local.env
   
    # Make QR codes
    % poetry run python donate-crypto/py/make_qr.py
   
    # Make index.html
    % poetry run python donate-crypto/py/make_index.py
    ```

### Branches
- [donate-crypto](https://github.com/nett-ef/nett-ef.github.io/tree/donate-crypto) - Live Web page
- [main](https://github.com/nett-ef/nett-ef.github.io/tree/main) - default GitHub Pages branch


