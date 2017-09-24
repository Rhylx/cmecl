const fs = require('fs')

const formatData = data => Object.keys(data).reduce((formatedData, key) => {
	formatedData[key] = data[key][0]
	return formatedData
},{})
// transforme la data reçu : mettre dans un objet sans les array 

const saveData = (data,path)  => {
	const strData = JSON.stringify(data)
	fs.writeFile(`${path}.json`, strData, console.log)
}
// transforme l'objet en string pour écrire 

const saveUser = data => {
	saveData(data, `user/${data.name}`)
} 



module.exports = (data, type) => saveUser(formatData(data))