const http = require('http')
const saveData = require('./savedata')
const multiparty = require('multiparty')
const fs = require('fs')
const sendJSON = (path,res) => 
	    	fs.readFile(path, (err, data) => {
	    		if (err) {
	    			if (err.code === 'ENOENT') {
	    				// to do (gérer erreur, utilisateur introuvable)
	    			}
	    			data = JSON.stringify(err)
	    		}
	    		res.writeHead(200, {'content-type': 'application/json'})
	      		res.end(data)
	    	})
const server = http.createServer((req, res) => {
    // console.log(req)
    if (req.url.startsWith('/user')) {
    	const user = req.url.slice(6)
    	if (user) {
    		sendJSON(`user/${user}.json`, res)

    	}
    	else {
	    	fs.readdir('user',(err, files) => {
	    		res.writeHead(200, {'content-type': 'application/json'})
	      		res.write(JSON.stringify(files, null, 2))
	    		res.end()
	    	})
    	}
    }
    else if (req.url === '/' && req.method === 'POST') {
    // parse a file upload
    	const form = new multiparty.Form()
    	form.parse(req, (err, fields, files) => {
      		console.log({fields, files})
      		res.writeHead(200, {'content-type': 'text/plain'})
      		res.write('received upload:\n\n')
    		res.end()
    		saveData(fields)
    	})
  	} else {
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