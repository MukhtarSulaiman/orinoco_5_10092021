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

const row = document.querySelector('.row')

const tr1 = document.querySelector('.tr1');
const tr2 = document.querySelector('.tr2');
const tr3 = document.querySelector('.tr3');

// Set table's components and the remove btn
function showProduct() {
	
	let basketItems = localStorage.getItem('basketItems');
	basketItems = JSON.parse(basketItems);

	// console.log(basketItems);

	if (basketItems && row) {
		// row.innerHTML = "";
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
                                <tr><td>${item.name}</td><td>${item.quantity}</td><td>${price} €</td><td>${item.lenses[0]}</td></tr>
                            <tfoot>
                                <tr><td class="text-info">Total</td><td></td><td></td><td class="text-info">${item.quantity * parseInt(price)},00 €</td></tr>
                            </tfoot>
                        </table>
                        <div class="d-flex justify-content-center justify-content-md-end">
                            <button id="removeButton" type="button" class="btn btn-danger p-1"> Suprimer<i class="bi bi-trash"></i></button>
                        </div>
                    </div>`;
		});
	} else {
		row.innerHTML = `<h2 class="text-center text-secondary">Votre panier est vide !<a href="index.html" class="text-info"> Retour à l'accueil</a></h2>`;
	}

	let totalCost = localStorage.getItem('totalCost');

	
	if (totalCost) {
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
}
showProduct()

// export {hideNumItemsOnToggler, setProductTable}