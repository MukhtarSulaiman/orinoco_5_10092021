/** @format */

let numItems1 = document.querySelector('.numItems1');
let numItems2 = document.querySelector('.numItems2');

// It displays the selected items after reloading the page  
export function onLoadBasketNumber() {
	numItems1.innerText = localStorage.getItem('basketNumber');
    numItems2.innerText = localStorage.getItem('basketNumber');
}

export function hideNumItemsOnToggler() {
    let togglerOnClick = document.querySelector('.togglerOnClick');
    //  It hides the number of items when the toggler button is clicked
    togglerOnClick.addEventListener('click', () => {
		if (togglerOnClick !== onclick) {
			numItems1.style.display = 'none';
		} else  {
			numItems1.style.display = 'inline';
		}
    });
}