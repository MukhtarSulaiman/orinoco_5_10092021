/** @format */
// import {basketNumber, onLoadBasketNumber} from "./product.js"

let numItems1 = document.querySelector('.numItems1');
let numItems2 = document.querySelector('.numItems2');

numItems1.innerText = localStorage.getItem('basketNumber');
numItems2.innerText = localStorage.getItem('basketNumber');

// Hides number of items when the button is fucosed
function hideNumItemsOnToggler() {
	if (numItems1 != onblur) {
		numItems1.style.display = 'none';
	} else {
		// has to be reviwed !
		numItems1.style.display = 'initial !important';
	}
}

// document.querySelector('.addToBasketOnPageProduct')
// addEventListener('click', () => {
// 	// console.log('Working is ...')
// 	// alert('This is an alert !')
// })


const thead = document.querySelector('.thead');
const tbody = document.querySelector('.tbody');
const tfoot = document.querySelector('.tfoot');


const product_img = document.getElementById('product_img');
const product_name = document.getElementById('product_name');
const product_quantity = document.getElementById('product_quantity');
const product_price = document.getElementById('product_price');
const product_lenses = document.getElementById('product_lenses');
const total_amount = document.getElementById('total_amount');

// Set table's components and the remove btn
function showProduct() {
	 
	

	thead.innerHTML = `<tr><th scope="col">Nom</th><th scope="col">Quantité</th><th scope="col">Prix</th><th scope="col">Lentille</th> </tr>`;
	tbody.innerHTML = `<tr><td id="product_name">Zurss</td><td id="product_quantity">1</td><td id="product_price">49900 €</td><td id="product_lenses">35mm 1.4</td></tr>`;
	tfoot.innerHTML = `<tr><td class="text-info">Total</td><td></td><td></td><td id="total_amount" class="text-info">49900 €</td></tr>`;
	
	let removeButton = document.getElementById('removeButton');
	removeButton.classList.add('btn-danger');
	removeButton.innerHTML = `Suprimer ` + `<i class="bi bi-trash"></i>`;

}
showProduct()



// export {hideNumItemsOnToggler, setProductTable}