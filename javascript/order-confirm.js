/** @format */
let orderId = new URL(location.href).searchParams.get('id');

// Sets order Id to the confiramtion page
function assignOrderId() {

    document.querySelector('#orderId').innerText = orderId;
    
    let totalCost = localStorage.getItem('totalCost');
    totalCost =
		`${totalCost}`.substring(0, `${totalCost}`.length - 2) +
		',' +
        `${totalCost}`.substring(`${totalCost}`.length - 2);
    
    document.querySelector('#totalPrice').innerText = `${totalCost} €`

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
    document.querySelector('#dateOfPurchase').innerText = `Date de commande ${fullDate}`;
    
}
setCurrentDate();
assignOrderId();

