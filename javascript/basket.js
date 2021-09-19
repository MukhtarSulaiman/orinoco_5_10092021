
let numItems1 = document.querySelector('.numItems1');
let numItems2 = document.querySelector('.numItems2');

numItems1.innerText = localStorage.getItem('basketNumber');
numItems2.innerText = localStorage.getItem('basketNumber');

function hideNumItemsOnToggler() {
	if (numItems1 != onblur) {
		numItems1.style.display = 'none';
	} else {
		numItems1.style.display = 'initial !important';
	}
}

