/** @format */
import { onLoadBasketNumber, hideNumItemsOnToggler } from './util.js';

// Set table's components and the remove btn
function showProduct() {

	let display_product = document.querySelector('.display_product');
	let basketItems = localStorage.getItem('basketItems');
	basketItems = JSON.parse(basketItems);

	if (basketItems && display_product) {
		Object.values(basketItems).map((item) => {
			let price =
				`${item.price}`.substring(0, `${item.price}`.length - 2) +
				',' +
				`${item.price}`.substring(`${item.price}`.length - 2);

			display_product.innerHTML +=
			`<div class="col-12 col-md-3 mt-3 mx-sm-0 mx-0 text-center">
				<img class="rounded-0" src="${item.imageUrl}" height="112" alt="">
			</div>
			<div class="col-12 col-md-9 my-4 mt-md-0">
				<table class="table text-center mb-1">
					<thead>
						<tr><th scope="col">Nom</th><th scope="col">Quantité</th><th scope="col">Prix</th><th scope="col">Lentille</th> </tr>
					</thead>
					<tbody>
						<tr><td class="name">${item.name}</td><td>${item.quantity}</td><td>${price} €</td><td>${item.lenses[0]}</td></tr>
					<tfoot>
						<tr><td class="text-info">Total</td><td></td><td></td><td class="text-info">${item.quantity * parseInt(price)},00 €</td></tr>
					</tfoot>
				</table>
				<div class="d-flex justify-content-center justify-content-md-end">
					<button type="button" class="btn btn-danger p-1 removeButton"> Supprimer</button>
				</div>
			</div>`;
		});
	}

	let basketNumber = localStorage.getItem('basketNumber');

	if (!basketNumber || basketNumber == 0) {
		display_product.innerHTML = `<h2 class="text-center text-secondary">Votre panier est vide !<a href="../index.html" class="text-info"> Retour à l'accueil</a></h2>`;
	}

	let totalCost = localStorage.getItem('totalCost');

	if (totalCost > 0) {
		totalCost =
			`${totalCost}`.substring(0, `${totalCost}`.length - 2) +
			',' +
			`${totalCost}`.substring(`${totalCost}`.length - 2);
		display_product.innerHTML += `<div class=" mt-5 d-flex justify-content-between text-center border-top border-dark">
			<div class="text-secondary"><h4>Total de la commande :</h4></div>
			<div class="fs-5 text-info"><p>${totalCost} €</p></div>
		</div>
		<div class="text-center mt-5">
			<button type="button" class="btn btn-danger btn-lg p-1" onclick="clearAllItems()"> Vider le panier <i class="bi bi-trash"></i></button>			
		</div>`;
	}
	deleteButton();
}

function deleteButton() {
	let removeButton = document.getElementsByClassName('removeButton');
	let name = document.querySelectorAll('.name');
	let productName;
	let basketNumber = localStorage.getItem('basketNumber');
	let basketItems = localStorage.getItem('basketItems');
	basketItems = JSON.parse(basketItems);
	let totalCost = localStorage.getItem('totalCost');

	for (let i = 0; i < removeButton.length; i++) {
		removeButton[i].addEventListener('click', () => {
			productName = name[i].textContent;
			localStorage.setItem(
				'basketNumber',
				basketNumber - basketItems[productName].quantity
			);
			localStorage.setItem(
				'totalCost',
				totalCost -
					basketItems[productName].price *
						basketItems[productName].quantity
			);
			delete basketItems[productName];
			localStorage.setItem('basketItems', JSON.stringify(basketItems));

			location.reload();
		});
	}
}

// Removes all items
window.clearAllItems = function () {
	localStorage.clear();
	location.reload();
};

// Form inputs sections

const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const zp = document.getElementById('zp');
const phone = document.getElementById('phone');
const email = document.getElementById('email');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	checkInputs(e);
});

function checkInputs(e) {
	// Gets the values form the inputs

	let lastNameValue = lastName.value.trim();
	let firstNameValue = firstName.value.trim();
	let addressValue = address.value.trim();
	let cityValue = city.value.trim();
	let zpValue = zp.value.trim();
	let phoneValue = phone.value.trim();
	let emailValue = email.value.trim();

	if (lastNameValue === '') {
		setErrorFor(lastName, 'Vous devez saisir votre nom !');
	} else if (!isLetters(lastNameValue)) {
		setErrorFor(lastName, 'Nom doit uniquement contenir des lettres !');
	} else if (lastNameValue[0] !== lastNameValue[0].toUpperCase()) {
		setErrorFor(lastName,'Première lettre doit commercer par majuscle !');
	} else if (lastNameValue.length < 3) {
		setErrorFor(lastName, 'Nom doit contenir au moins 3 lettres !');
	} else {
		setSuccessFor(lastName);
	}

	if (firstNameValue === '') {
		setErrorFor(firstName, 'Vous devez saisir votre prénom !');
	} else if (!isLetters(firstNameValue)) {
		setErrorFor(firstName,'Prénom doit uniquement contenir des lettres !');
	} else if (firstNameValue[0] !== firstNameValue[0].toUpperCase()) {
		setErrorFor(firstName,'Première lettre doit commercer par majuscle !'
		);
	} else if (firstNameValue.length < 3) {
		setErrorFor(firstName, 'Prénom doit contenir au moins 3 lettres !');
	} else {
		setSuccessFor(firstName);
	}

	if (addressValue === '') {
		setErrorFor(address, 'Champ est obligatoire !');
	} else if (!isAddress(addressValue)) {
		setErrorFor(address, 'Saisir au moins 2 chiffres et 15 lettres! !');
	}else {
		setSuccessFor(address);
	}

	if (cityValue === '') {
		setErrorFor(city, 'Champ est obligatoire !');
	} else if (!isLetters(cityValue)) {
		setErrorFor(city, 'Ville doit uniquement contenir des lettres !');
	} else if (cityValue[0] !== cityValue[0].toUpperCase()) {
		setErrorFor(city, 'Première lettre doit commercer par majuscle !');
	} else if (cityValue.length < 3) {
		setErrorFor(city, 'Ville doit contenir au moins 3 lettres !');
	} else {
		setSuccessFor(city);
	}

	if (zpValue === '') {
		setErrorFor(zp, 'Champ est obligatoire !');
	} else if (!isNumber(zpValue)) {
		setErrorFor(zp, 'Saisir au moins 5 chiffres!');
	} else {
		setSuccessFor(zp);
	}

	if (phoneValue === '') {
		setErrorFor(phone, 'Champ est obligatoire !');
	} else if (phoneValue.length < 10) {
		setErrorFor(phone, 'Saisir au moins 10 chiffres!');
	} else {
		setSuccessFor(phone);
	}

	if (emailValue === '') {
		setErrorFor(email, 'Champ est obligatoire !');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, "E-mail n'est pas valide !");
	} else {
		setSuccessFor(email);
	}

	if (
		lastNameValue &&
		firstNameValue &&
		addressValue &&
		cityValue &&
		zpValue &&
		phoneValue &&
		emailValue !== '' &&
		isLetters(lastNameValue) &&
		isLetters(firstNameValue) &&
		isAddress(addressValue) &&
		isNumber(zpValue) &&
		isEmail(emailValue) &&
		lastNameValue[0] === lastNameValue[0].toUpperCase() &&
		firstNameValue[0] === firstNameValue[0].toUpperCase() &&
		cityValue[0] === cityValue[0].toUpperCase() &&
		lastNameValue.length >= 3 &&
		firstNameValue.length >= 3 &&
		cityValue.length >= 3 &&
		phoneValue.length >= 10
	) {
		getFormInputDataAndProductId(e);
	}
}

function setErrorFor(input, message) {
	const formGroup = input.parentElement; //gets form-group class
	const small = formGroup.querySelector('small');

	// Adds error message insife small tag
	small.innerText = message;
	formGroup.classList.add('error');
	formGroup.classList.remove('success');
	// console.log(formGroupe)
}

function setSuccessFor(input) {
	const formGroup = input.parentElement; //gets form-group class
	formGroup.classList.add('success');
	formGroup.classList.remove('error');
}


function isLetters(letter) {
	return /[a-zA-Z-âãäåæçèéêëìíîïðñòóôõøùúûüýþÿı]/.test(letter);
}

function isAddress(address) {
	return /[0-9\s]{2,}[,]{0,}\s[a-zA-Za-zA-Z-âãäåæçèéêëìíîïðñòóôõøùúûüýþÿı,\s]{16,}/i.test(address);
}

function isNumber(number) {
	return /[0-9]{5,}/.test(number);
}

function isEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}


function getFormInputDataAndProductId() {
	let productId = [];

	let basketItems = localStorage.getItem('basketItems');
	basketItems = JSON.parse(basketItems);

	for (let name in basketItems) {
		productId.push(basketItems[name]._id);
	}

	let contact = {
		firstName: firstName.value,
		lastName: lastName.value,
		address: address.value,
		city: city.value,
		zp: zp.value,
		phone: phone.value,
		email: email.value,
	};

	let dataToSend = {
		contact: contact,
		products: productId,
	};

	let url = 'https://orinoco.onrender.com/api/cameras/order';

	fetch(url, {
		method: 'POST',
		body: JSON.stringify(dataToSend),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			let orderId = data.orderId;
			document.location.href = 'order-confirm.html?id=' + orderId;
		})
		.catch((error) => {
			console.log(error);
		});
}

// Display form contact if there's any item in the basket
function displayFormContact() {
	let display_form_contact = document.querySelector('.display_form_contact');
	display_form_contact.style.display = 'none';

	if (localStorage.getItem('basketNumber') > 0) {
		display_form_contact.style.display = 'block';
	}
}

onLoadBasketNumber();
hideNumItemsOnToggler();
showProduct();
displayFormContact();
