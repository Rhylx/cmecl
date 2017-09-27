const fs = require('fs')

const formatData = data => Object.keys(data).reduce((formatedData, key) => {
	formatedData[key] = data[key][0]
	return formatedData
},{})
// transform received data : it's a fold !!!

const saveData = (data,path)  => {
	const strData = JSON.stringify(data)
	fs.writeFile(`${path}.json`, strData, console.log)
}
// transforme l'objet en string pour écrire 

const saveUser = data => {
	saveData(data, `user/${data.surname}`)
} 



module.exports = data => saveUser(formatData(data))