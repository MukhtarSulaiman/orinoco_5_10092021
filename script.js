// test !

fetch('http://localhost:3000/api/cameras')
	.then((response) => {
		if (response.ok) {
			return response.json();
		}
	})
	.then((value) => {
        console.log(value);
        for (let i = 0; i < value.length; i++) {
            console.log(value[i])
        }
	})
	.catch((error) => {
		console.error();
	});