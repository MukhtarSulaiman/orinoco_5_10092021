/** @format */

let productId = new URL(location.href).searchParams.get('id');
// let rawData = "";

let url = 'http://localhost:3000/api/cameras';

fetch(url + '/' + productId)
	.then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			document.getElementById(
				'main'
			).innerHTML = `<div class="alert alert-warning text-center" role="alert">Oops un problème de serveur :( ! <a href="index.html" class="alert-link">Retournez à la page d'accueil </a>.</div>`;
		}
	})
	.then((data) => {
		// rawData = data;
		
		setProduct(data);
	})
	.catch((error) => {
		console.log(error);
	});
	

const imgContain = document.getElementById('imgContain');
const productName = document.getElementById('productName');
const price = document.getElementById('price');
const description = document.getElementById('description');

// Sets product details
function setProduct(product) {

	let img = document.createElement('img');
	img.src = `${product.imageUrl}`;
	img.classList.add('img-thumbnail', 'h-100', 'h-rounded-0');
	imgContain.appendChild(img);

	productName.innerText = `${product.name}`;
	description.innerText = `${product.description}`;

	// Adds a comma before the last two numbers
	let floatingPointNum =
		`${product.price}`.substring(0, `${product.price}`.length - 2) +
		',' +
		`${product.price}`.substring(`${product.price}`.length - 2);
	price.innerText = floatingPointNum + ' €';

	for (let arr of product.lenses) {
		document.getElementById(
			'lenses'
		).innerHTML += `<option value="${arr}">${arr}</option>`;
	}

	customizingElements(product);
}


const quantityTitle = document.getElementById('quantityTitle');
const lensesTitle = document.getElementById('lensesTitle');
const option = document.getElementById('option');
const addToBasketOnPageProduct = document.querySelector('.addToBasketOnPageProduct');

function customizingElements(product) {
	quantityTitle.innerText = 'Quantité :';
	lensesTitle.innerText = 'Lentille :';
	addToBasketOnPageProduct.innerText = 'Ajouter au pannier';

	for (let i = 5; i > 1; i--) {
		option.insertAdjacentHTML(
			'afterend',
			`<option value="${i}">${i}</option>`
		);
	}


	addToBasketOnPageProduct.addEventListener('click', () => {
		basketNumber(product);
	});
}


const numItems1 = document.querySelector('.numItems1');
const numItems2 = document.querySelector('.numItems2');

function hideNumItemsOnToggler() {

	if (numItems1 != onblur) {
		numItems1.style.display = 'none';
	} else {
		// has to be reviwed !
		numItems1.style.display = 'initial !important';
	}	

}



// Sets the intial value of locaStrage 
// Shows the number of available items on the header 
function basketNumber(product) {

	let productNumber = localStorage.getItem('basketNumber');
	productNumber = parseInt(productNumber);

	if (productNumber) {
		localStorage.setItem('basketNumber', productNumber + 1);
		numItems1.innerText = productNumber + 1;
		numItems2.innerText = productNumber + 1;
	} else {
		localStorage.setItem('basketNumber', 1);
		numItems1.innerText = 1;
		numItems2.innerText = 1;
	}

	itemAdded(product);
}


// Sets the value of the locaStorage to basket when loading the page
function onLoadBasketNumber() {
	
	let productNumber = localStorage.getItem('basketNumber');
	if (productNumber) {
		numItems1.innerText = productNumber ;
		numItems2.innerText = productNumber;
	}
}
onLoadBasketNumber();


function itemAdded(product) {

	product.quantity = 0;

	let basketItems = localStorage.getItem('basketItems')
	basketItems = JSON.parse(basketItems)

	if (basketItems != null) {
		if (basketItems[product._id] == undefined) {
			basketItems = {
			...basketItems,
				[product._id]: product
			}
		}
		basketItems[product._id].quantity += 1;
		// console.log(basketItems[product._id]);
	} else {
		product.quantity = 1;
		basketItems = {
			[product._id]: product
		}
	}
	
	localStorage.setItem('basketItems', JSON.stringify(basketItems));
	
}

// export { basketNumber, onLoadBasketNumber}