// Retreiving data from the API
async function fetchData() {

    try {
        let data = await fetch('http://localhost:3000/api/cameras').then(
            (response) => response.json());
            showProductList(data)
        // console.log(data);

    } catch (err) {
        document.getElementById('intro')
            .innerHTML = `<div class="alert alert-warning text-center" role="alert">Oops un problème de serveur :( ! <a href="index.html" class="alert-link">Retournez à la page d'accueil </a>.</div>`;
        console.log(err);
    }

}
fetchData();



let product_details = document.getElementById('product_details');

let numItems1 = document.querySelector('.numItems1');
let numItems2 = document.querySelector('.numItems2');

numItems1.innerText = localStorage.getItem('basketNumber');
numItems2.innerText = localStorage.getItem('basketNumber');

// Hides Items number on the toggler button
function hideNumItemsOnToggler() {

	if (numItems1 != onblur) {
		numItems1.style.display = 'none';
	} else {
		numItems1.style.display = 'initial !important';
	}	

}


// Shows all products on the main page

function showProductList(data) {

	const sub_heading = document.getElementById('sub_heading');
	sub_heading.innerText = 'Nos produits';

	for (let i = 0; i < data.length; i++) {
		let floatingPointNum =
			`${data[i].price}`.substring(0, `${data[i].price}`.length - 2) +
			',' +
			`${data[i].price}`.substring(`${data[i].price}`.length - 2);

		product_details.innerHTML += `
         <div class="col-12 col-sm-4 column">
            <a id="product_details" href="product.html?id=${data[i]._id}">
                <img id="product_img" src="${
					data[i].imageUrl
				}" class="card-img-top img-thumbnail" alt="Image de produit">
                <div class="card-body text-secondary mb-4">
                    <h3 id="product_name" class="card-title">${
					data[i].name
				}</h3>
                    <span id="product_price">Prix :${
					' ' + floatingPointNum + ' '
				}€</span>
                    <button class="btn btn-primary btn-sm float-end details-btn">Voir le produit</button>
                </div>
            </a>
        </div>`;
	}

	let div = document.createElement('div');
	div.classList.add('col-12', 'col-sm-4');
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';

	let icon = document.createElement('i');
	icon.classList.add('bi', 'bi-plus-square-fill');
	icon.setAttribute('id', product_name);
	icon.style.fontSize = '50px';
	icon.style.color = '#F1E9F0';

	div.appendChild(icon);
	product_details.appendChild(div);
}