const http = require('http')
const saveData = require('./savedata')
const multiparty = require('multiparty')
const fs = require('fs')
const server = http.createServer((req, res) => {
    console.log(req)
    if (req.url === '/' && req.method === 'POST') {
    // parse a file upload
    	const form = new multiparty.Form()
    	form.parse(req, (err, fields, files) => {
      		console.log({fields, files})
      		res.writeHead(200, {'content-type': 'text/plain'})
      		res.write('received upload:\n\n')
    		res.end()
    		saveData(fields)
    	})
  	} else if (req.url === '/form.css') {
  	// css file 
  		fs.readFile('form.css', (err, page) => { 
  			res.writeHead(200, {
  				'Content-Type': 'text/css'}) 
  				res.write(page)
  				res.end()
  			}) 
  	} else {
  	// html file
	    fs.readFile('form.html', (err, data) => {
	        res.writeHead(200, {
	            'Content-Type': 'text/html',
	            'Content-Length': data.length
	        })
	        
	        res.write(data)
	        res.end()
	    })

	}
})


server.listen(1185)
console.log("server listening on 1185")