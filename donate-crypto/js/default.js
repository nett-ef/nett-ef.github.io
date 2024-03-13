function get_wallet_address(wallet_id) {
	const query = `#${wallet_id} .copy_address .wallet_address`;
	return document.querySelector(query);
}

function copy_to_clipboard(text) {
	navigator.clipboard.writeText(text);
}

function select_text(elem) {
	elem.focus();
	elem.select();
	elem.setSelectionRange(0, 99999);
}

function show_copied_label(wallet_id) {
	const query = `#${wallet_id} .copy_address .address_copied`;
	const label = document.querySelector(query);
	label.style.visibility = 'visible';
}

function get_wallet_id(button_id) {
	return button_id.replace('button', 'wallet');
}

function show_button_selection(button_id, is_selected) {
	const icon = document.querySelector(`#${button_id} .rounded_square`);
	const wallet = document.getElementById(get_wallet_id(button_id));
	if (is_selected) {
		icon.className = 'rounded_square selected';
		wallet.style.display = 'block';
	} else {
		icon.className = 'rounded_square';
		wallet.style.display = 'none';
	}
}

var selected_button_id = '';
function select_coin_button(button_id) {
	if (selected_button_id !== '') {
		show_button_selection(selected_button_id, false);
	}
	selected_button_id = button_id;
	show_button_selection(button_id, true);
}

function coin_button_click(event) {
	let button = event.target;
	if (!button.className.includes('coin_button')) {
		button = button.closest('.coin_button');
	}
	select_coin_button(button.id);
	const wallet_id = get_wallet_id(button.id);
	const address = get_wallet_address(wallet_id);
	select_text(address);
	copy_to_clipboard(address.textContent);
	show_copied_label(wallet_id);
}

window.addEventListener('load', (event) => {
	let buttons = document.getElementsByClassName('coin_button');
	for (const b of buttons) {
		b.addEventListener('click', coin_button_click);
	}
	const button_id = buttons[0].id;
	select_coin_button(button_id);
	const address = get_wallet_address(get_wallet_id(button_id));
	select_text(address);
});