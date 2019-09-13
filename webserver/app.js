const http = require('http');
const fs = require('fs');
const mime = require('mime-types');
const port = 80;
const app = http.createServer((req, res) => {
	let path = '.' + req.url.split('?')[0];
	if (path[path.length - 1] === '/') {
		path += 'index.html';
	}
	let file;
	try {
		file = fs.readFileSync(path);
	} catch(e) {
		file = null;
	}
	if (file !== null) {
		res.writeHead(200, {'Content-Type': mime.lookup(path)});
		res.end(file);
	} else {
		res.statusCode = 404;
		res.end();
	}
});
app.listen(port, () => {
	console.log(`Server started at port ${port} - ${new Date()}`);
});