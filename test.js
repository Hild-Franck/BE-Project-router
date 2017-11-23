const myFunc = () => {
	const obj = {
		first: (resolve, value) => {
			console.log('first', value)
			resolve(value)
		},
		second: (resolve, value) => {
			console.log('second', value)
			resolve(value)
		}
	}
	firstPromise = new Promise((resolve, reject) => {
		setTimeout(() => { obj.first(resolve, 'Pouet1') }, 1000)				
	})
	secondPromise = new Promise((resolve, reject) => {
		setTimeout(() => { obj.second(resolve, 'Pouet2') }, 5000)
	})
	return Promise.all([ firstPromise, secondPromise ])
}


myFunc().then(console.log)