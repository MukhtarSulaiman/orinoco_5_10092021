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
		// console.log(data);
	})
	.catch((error) => {
		console.log(error);
    });
    

// Sets product details
let btn = `<button id="addToBasket" type="button" class="btn btn btn-primary btn-lg mt-4 mt-xl-5 btn-add">Ajouter au pannier</button>`;

function setProduct(product) {
	const insertContent = document.getElementById('insertContent');
	insertContent.innerHTML = `
                        <div class="col-md-6">
                            <img id="img_url" class="img-thumbnail h-100 h-rounded-0" src="${product.imageUrl}"  alt="...">
                        </div>
                        <div class=" col-12 col-md-6">
                            <h1 id="product_name" class="mt-2">${product.name}</h1>
                            <span id="price">${product.price} €</span>
                            <p id="description" class="mt-4 mt-xxl-5">${product.description}</p>
                            <div class="row mt-xxl-5">
                                <div class="col-12 col-sm-6">
                                    <label for="quantité">Quantité :</label>
                                    <select name="Quantité" id="quantité" class="">
                                        <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>
                                    </select>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <label for="lentille">Lentille :</label>
                                    <select name="lentille" id="lenses" class=""></select>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <button id="addToBasket" type="button" class="btn btn btn-primary btn-lg mt-4 mt-xl-5 btn-add">Ajouter au pannier</button>
                                </div>
                            </div>
                        </div>
                        `;

	for (let arr of product.lenses) {
		document.getElementById(
			'lenses'
		).innerHTML += `<option value="${arr}">${arr}</option>`;
	}

	let addToBasket = document.getElementById('addToBasket');

	addToBasket.addEventListener('click', () => {
		// console.log('added to basket');

        basketNumber()
	});
}



function basketNumber() {

    let productNumber = localStorage.getItem('basketNumber');
    productNumber = parseInt(productNumber);

    console.log(productNumber);     

    localStorage.setItem('basketNumber', 1);
    
}

