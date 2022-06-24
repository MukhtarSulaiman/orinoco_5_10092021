/** @format */
import { onLoadBasketNumber, hideNumItemsOnToggler } from './util.js';

// Retreiving data from the API
async function fetchData() {
	try {
		let data = await fetch('http://localhost:3000/api/cameras').then(
			(response) => response.json()
		);
		showProductList(data);
		// console.log(data);
	} catch (err) {
		document.getElementById(
			'intro'
		).innerHTML = `<div class="alert alert-warning text-center fs-4" role="alert">Oops un problème de serveur ! :(</div>`;
		console.log(err);
	}
}


// Shows all products on the main page
function showProductList(data) {

	let product_details = document.getElementById('product_details');
	const sub_heading = document.getElementById('sub_heading');
	sub_heading.innerText = 'Nos produits';

	for (let i = 0; i < data.length; i++) {
		let floatingPointNum =
			`${data[i].price}`.substring(0, `${data[i].price}`.length - 2) +
			',' +
			`${data[i].price}`.substring(`${data[i].price}`.length - 2);

		product_details.innerHTML +=
			` <div class="col-12 col-sm-4 column">
				<a id="product_details" href="./html/product.html?id=${data[i]._id}">
					<img id="product_img" src="${data[i].imageUrl}" class="card-img-top img-thumbnail" alt="Image de produit">
					<div class="card-body text-secondary mb-4">
						<h3 id="product_name" class="card-title">${data[i].name}</h3>
						<span id="product_price">Prix :${' ' + floatingPointNum + ' '}€</span>
						<button class="btn btn-primary btn-sm float-end details-btn">Voir le produit</button>
					</div>
				</a>
			</div>`;
	}

	// It creates a parent div to hold the square-fill icon
	let div = document.createElement('div');
	div.classList.add('col-12', 'col-sm-4');
	div.style.display = 'flex';
	div.style.justifyContent = 'center';
	div.style.alignItems = 'center';

	// It creates the square-fill icon that represent a placeholder for more products to come
	let icon = document.createElement('i');
	icon.classList.add('bi', 'bi-plus-square-fill');
	icon.setAttribute('id', product_name);
	icon.style.fontSize = '50px';
	icon.style.color = '#F1E9F0';

	div.appendChild(icon);
	product_details.appendChild(div);
}

fetchData();
onLoadBasketNumber();
hideNumItemsOnToggler();
