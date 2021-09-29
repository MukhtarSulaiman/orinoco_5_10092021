/** @format */
let orderId = new URL(location.href).searchParams.get('id');

// Sets the order Id to the confiramtion page
function assignOrderId() {

    if (!localStorage.getItem('basketItems')) {
        document.querySelector('.order-confirm-container')
            .style.display = 'none';
         document.querySelector('.backword_message')
            .innerHTML = `<h2 class="text-center text-secondary">Retour <a href="index.html" class="text-info">à la page d'accueil !</a></h2>`;
    } else {
        document.querySelector('.order-confirm-container').style.display =
            'block';
        document.querySelector('#orderId').innerText = orderId;

        let totalCost = localStorage.getItem('totalCost');
        totalCost =
            `${totalCost}`.substring(0, `${totalCost}`.length - 2) +
            ',' +
            `${totalCost}`.substring(`${totalCost}`.length - 2);

        document.querySelector('#totalPrice').innerText = `${totalCost} €`;
        localStorage.clear();
    } 
}


// Sets the date of purchase
function setCurrentDate() {

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minut = date.getMinutes();

    let fullDate = `Le ${day}/${month}/${year} à ${hour}h${minut}`;
    document.querySelector('#dateOfPurchase').innerText = `Date de commande : ${fullDate}`;  

}

setCurrentDate();
assignOrderId();

