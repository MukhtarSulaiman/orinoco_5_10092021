/** @format */

let numItems1 = document.querySelector('.numItems1');
let numItems2 = document.querySelector('.numItems2');
numItems1.innerText = localStorage.getItem('basketNumber');
numItems2.innerText = localStorage.getItem('basketNumber');

// It's an eventListener that hides number of items when the button is fucosed
function hideNumItemsOnToggler() {
	if (numItems1 != onblur) {
		numItems1.style.display = 'none';
	} else {
		// has to be reviwed !
		numItems1.style.display = 'initial !important';
	}
}

function onLoadBasketNumber() {
	let basketNumber = localStorage.getItem('basketNumber');

	if (basketNumber == 0) {
		numItems1.style.display = 'none';
		numItems2.style.display = 'none';
		
	} else {
		numItems1.innerText = basketNumber;
		numItems2.innerText = basketNumber;
	}
}


// Set table's components and the remove btn
function showProduct() {

	let row = document.querySelector('.row');				
	let basketItems = localStorage.getItem('basketItems');
	basketItems = JSON.parse(basketItems);
		
	if (Object.keys(basketItems).length != 0) {
		
		Object.values(basketItems).map(item => {

			let price =
				`${item.price}`.substring(0, `${item.price}`.length - 2) +
				',' + `${item.price}`.substring(`${item.price}`.length - 2);
			
			
			row.innerHTML +=
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
					<button type="button" class="btn btn-danger p-1 removeButton"> Suprimer<i class="bi bi-trash"></i></button>
				</div>
			</div>`;

		});
	}
	
	let basketNumber = localStorage.getItem('basketNumber');
	
	if(!basketNumber || basketNumber == 0) {
		row.innerHTML = `<h2 class="text-center text-secondary">Votre panier est vide !<a href="index.html" class="text-info"> Retour à l'accueil</a></h2>`;
	}

	let totalCost = localStorage.getItem('totalCost');
	
	if (totalCost > 0) {
		totalCost =
			`${totalCost}`.substring(0, `${totalCost}`.length - 2) +
			',' +
			`${totalCost}`.substring(`${totalCost}`.length - 2);
		row.innerHTML +=
		`<div class=" mt-5 d-flex justify-content-between text-center border-top border-dark">
			<div class="text-secondary"><h4>Total de la commande :</h4></div>
			<div class="fs-5 text-info"><p>${totalCost} €</p></div>
		</div>
		`;
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
	let totalCost = localStorage.getItem('totalCost')

	for (let i = 0; i < removeButton.length; i++) {
		removeButton[i].addEventListener('click', () => {
			productName = name[i].textContent;
			localStorage.setItem('basketNumber', basketNumber - basketItems[productName].quantity);
			localStorage.setItem('totalCost', totalCost - (basketItems[productName].price * basketItems[productName].quantity));
			delete basketItems[productName];
			localStorage.setItem('basketItems', JSON.stringify(basketItems))

			location.reload();
		});
	}
}
onLoadBasketNumber();
showProduct();


// Form inputs sections

const form = document.getElementById('form')
const lastName = document.getElementById('lastName');
const firstName = document.getElementById('firstName');
const adress = document.getElementById('adress');
const city = document.getElementById('city');
const zp = document.getElementById('zp');
const phone = document.getElementById('phone');
const email = document.getElementById('email');

form.addEventListener('change', () => {

	checkInputs();
})

function checkInputs() {
	// Gets the values form the inputs

	let = lastNameValue = lastName.value.trim();
	let = firstNameValue = firstName.value.trim();
	let = adressValue = adress.value.trim();
	let = cityValue = city.value.trim();
	let = zpValue = zp.value.trim();
	let = phoneValue = phone.value.trim();
	let = emailValue = email.value.trim();

	if (lastName === '') {
		setErrorFor(lastName, 'Vous devez saisir votre nom !') 
	}

}
