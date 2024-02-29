function copy_address(wallet) {
	for (let c of wallet.children) {
		copy_address(c)
	   	if (c.className.includes('wallet_address')) {
			c.focus();
			c.select();
			c.setSelectionRange(0, 99999);
			navigator.clipboard.writeText(c.textContent);
		}
		if (c.className.includes('address_copied')) {
			c.style.visibility = 'visible';
		}
	}
}

function select_coin_button(button, selected) {
	wallet = document.getElementById('wallet-' + button.value);
	for (let c of button.children) {
		if (c.className.includes('rounded_square')) {
			var icon = c;
			break;
		}
	}
	if (selected) {
		wallet.style.display = 'block';
		icon.className = 'rounded_square selected';
	} else {
		wallet.style.display = 'none';
		icon.className = 'rounded_square';
	}
}

function reset_coin_buttons() {
	buttons = document.getElementsByClassName('coin_button');
	for (let button of buttons) {
		select_coin_button(button, false);
	}
}

var selected_button_id = ''
function coin_button_click(event) {
	let button = event.target;
	while (button.className !== 'coin_button') {
		button = button.parentElement;
	}
	if (selected_button_id !== '') {
		prev = document.getElementById(selected_button_id);
		select_coin_button(prev, false);
	}
	select_coin_button(button, true);
	selected_button_id = button.id;
	wallet = document.getElementById('wallet-' + button.value);
	copy_address(wallet);
}

window.addEventListener('load', (event) => {
	reset_coin_buttons();
	select_coin_button(buttons[0], true);
	selected_button_id = buttons[0].id;
	buttons = document.getElementsByClassName('coin_button');
	for (let b of buttons) {
		b.addEventListener('click', coin_button_click);
	}
});