/** @format */
import { onLoadBasketNumber, hideNumItemsOnToggler } from './util.js';

let productId = new URL(location.href).searchParams.get('id');
let url = 'https://mukhtars-orinoco.herokuapp.com/api/cameras';
// Returns an object that contains product's details
fetch(url + '/' + productId)
	.then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			document.getElementById('main')
				.innerHTML = `<div class="alert alert-warning text-center" role="alert">Oops un problème de serveur :( ! <a href="../index.html" class="alert-link">Retournez à la page d'accueil </a>.</div>`;
		}
	})
	.then((data) => {
		setProduct(data);
	})
	.catch((error) => {
		console.log(error);
	}
);

const imgContain = document.getElementById('imgContain');
const productName = document.getElementById('productName');
const price = document.getElementById('price');
const description = document.getElementById('description');

// Sets product details
function setProduct(product) {

	let img = document.createElement('img');
	img.src = `${product.imageUrl}`;
	img.classList.add('img-thumbnail', 'auto', 'h-rounded-0');
	imgContain.appendChild(img);

	productName.innerText = `${product.name}`;
	description.innerText = `${product.description}`;

	// Adds a comma before the last two numbers
	let floatingPointNum =
		`${product.price}`.substring(0, `${product.price}`.length - 2) +
		',' +
		`${product.price}`.substring(`${product.price}`.length - 2);
	price.innerText = floatingPointNum + ' €';

	customizingElements(product);
}


const quantityTitle = document.getElementById('quantityTitle');
const lensesTitle = document.getElementById('lensesTitle');
const quantity = document.getElementById('quantity');
const addItemsToBasket = document.querySelector('.addItemsToBasket');

//Define the customization elements 
function customizingElements(product) {
	quantityTitle.innerText = 'Quantité :';
	lensesTitle.innerText = 'Lentille :';
	addItemsToBasket.innerText = 'Ajouter au panier';

	for (let i = 1; i < 11; i++) {
		quantity.innerHTML += `<option value="${i}">${i}</option>`;
	}

	for (let arr of product.lenses) {
		document.getElementById('lenses').innerHTML += `<option value="${arr}">${arr}</option>`;
	}

	addItemsToBasket.addEventListener('click', () => {
		setBasketNumber(product);
		setItemAdded(product);
		setTotalCost(product.price);
	});
}


let valueSelected = 1;
// It's an eventListenr that gets the value of a selected option
window.getOptionValue = function () {
	valueSelected = quantity.value;
	valueSelected = parseInt(valueSelected);
}

// Sets the intial value of the items number in the locaStrage 
// It displays the selected items on the page without refreshing the page
function setBasketNumber() {

	let numItems1 = document.querySelector('.numItems1');
	let numItems2 = document.querySelector('.numItems2');
	let productNumber = localStorage.getItem('basketNumber');
		productNumber = parseInt(productNumber);

	if (productNumber) {
		localStorage.setItem('basketNumber', productNumber += valueSelected);
		numItems1.innerText = productNumber;
		numItems2.innerText = productNumber;
	
	} else {
		localStorage.setItem('basketNumber', valueSelected);
		numItems1.innerText = valueSelected;
		numItems2.innerText = valueSelected;
	}
}

// Sets the product itself 
function setItemAdded(product) {
	product.quantity = 0;

	let basketItems = localStorage.getItem('basketItems');
		basketItems = JSON.parse(basketItems);

	if (basketItems != null) {
		if (basketItems[product.name] == undefined) {
			basketItems = {
				...basketItems,
				[product.name]: product,
			};
		}
		basketItems[product.name].quantity += valueSelected;
	} else {
		product.quantity = valueSelected;
		basketItems = {
			[product.name]: product,
		}; 
	}	
	localStorage.setItem('basketItems', JSON.stringify(basketItems));
}


// Sets the total price of items
function setTotalCost(price) {
	
	let totalCost = localStorage.getItem('totalCost');
		totalCost = JSON.parse(totalCost);
	
	if (totalCost != null) {
		localStorage.setItem('totalCost', totalCost += price * valueSelected);
	} else {
		localStorage.setItem('totalCost', price * localStorage.getItem('basketNumber'));
	}
}

onLoadBasketNumber();
hideNumItemsOnToggler();
