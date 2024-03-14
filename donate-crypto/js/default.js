function get_wallet_address(wallet_id) {
	const query = `#${wallet_id} .copy_address .wallet_address`;
	return document.querySelector(query);
}

function get_copied_label(wallet_id) {
	const query = `#${wallet_id} .copy_address .address_copied`;
	return document.querySelector(query);
}

function get_coin_name(wallet_id) {
	const query = `#${wallet_id} .coin_name`;
	return document.querySelector(query);
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
	navigator.clipboard.writeText(address.textContent);
	const label = get_copied_label(wallet_id);
	label.style.visibility = 'visible';
	const coin_name = get_coin_name(wallet_id);
	coin_name.scrollIntoView(true);
}

window.addEventListener('load', (event) => {
	let buttons = document.getElementsByClassName('coin_button');
	for (const b of buttons) {
		b.addEventListener('click', coin_button_click);
	}
	const button_id = buttons[0].id;
	select_coin_button(button_id);
});