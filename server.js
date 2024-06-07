const http = require('http') // Require modules
const PORT = process.env.PORT || 3000; // Check for environment variable
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('./controllers/productController.js')

const server = http.createServer((req, res) => { // req and res are Objects
    /*
    // Sending a generic HMTL page
    res.statusCode = 200; // Need a status code
    res.setHeader('Content-Type', 'text/html') // Define what type of content is being sent
    res.write('<h1>Hello World</h1>');
    res.end();
    */

    if (req.url === '/api/products' && req.method === 'GET') { // Query request url and method
        getProducts(req, res);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') { // Match /api/products/id using regex
        
        const id = req.url.split('/')[3] // In express you could just grab the url params
        getProduct(req, res, id);

    } else if (req.url === '/api/products' && req.method === 'POST') {
        createProduct(req,res);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') { // Match /api/products/id using regex
        
        const id = req.url.split('/')[3];
        updateProduct(req, res, id);

    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE') { // Match /api/products/id using regex
        
        const id = req.url.split('/')[3];
        deleteProduct(req, res, id);

    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Route not found.'}));
    }
}) 


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})