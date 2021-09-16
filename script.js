/** @format */

let productId = new URL(location.href).searchParams.get('id');

let url = 'http://localhost:3000/api/cameras';

fetch( url + '/' + productId)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            document.getElementById('main')
                .innerHTML = `<div class="alert alert-warning text-center" role="alert">Oops un problème de serveur :( ! <a href="index.html" class="alert-link">Retournez à la page d'accueil </a>.</div>`;
		}
	})
	.then((data) => {
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
    let floatingPointNum = `${product.price}`.substring(0, `${product.price}`.length - 2) + ',' + `${product.price}`.substring(`${product.price}`.length - 2);
    price.innerText = floatingPointNum + " €";


    for (let arr of product.lenses) {
     document.getElementById('lenses')
        .innerHTML += `<option value="${arr}">${arr}</option>`;
    }

    customizingElements();
		
}




function customizingElements() {
	const quantityTitle = document.getElementById('quantityTitle');
	const lensesTitle = document.getElementById('lensesTitle');
	const option = document.getElementById('option');
	const button = document.getElementById('button');

	quantityTitle.innerText = 'Quantité :';
	lensesTitle.innerText = 'Lentille :';

	let btn = document.createElement('button');
	btn.setAttribute('id', 'addToBasket');
	btn.classList.add(
		'btn',
		'btn',
		'btn-primary',
		'btn-lg',
		'mt-4',
		'mt-xl-5',
		'btn-add'
	);
	button.appendChild(btn).innerText = 'Ajouter au pannier';

	for (let i = 5; i > 1; i--) {
		option.insertAdjacentHTML(
			'afterend',
			`<option value="${i}">${i}</option>`
		);
	}

    let addToBasket = document.getElementById('addToBasket');
    console.log(addToBasket)
	addToBasket.addEventListener('click', () => {
		// console.log('added to basket');

		basketNumber();
	});

	function basketNumber() {
		let productNumber = localStorage.getItem('basketNumber');
		productNumber = parseInt(productNumber);

		console.log(productNumber);

		localStorage.setItem('basketNumber', 1);
	}
}