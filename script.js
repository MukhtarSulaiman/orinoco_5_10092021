
fetch('http://localhost:3000/api/cameras')
	.then((response) => {
		if (response.ok) {
			return response.json();
        } else {
            alert('Oops problème de serveur ! :(');
        }
	})
    .then((data) => {
        setProduct(data);
        // console.log(value);
	})
	.catch((error) => {
		console.error();
    });


const img_url = document.getElementById('img_url');
const product_name = document.getElementById('product_name');
const price = document.getElementById('price');
const description = document.getElementById('description');

// Sets product details 

function setProduct(value) {
    img_url.src = value[0].imageUrl;
	product_name.innerHTML = value[0].name;
    price.innerHTML = `Prix : ${value[0].price}€`;
    description.innerHTML = value[0].description;
 }
    
    