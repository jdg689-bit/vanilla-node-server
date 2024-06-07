const Product = require('../models/productModel') // Bring in the model

const { getPostData } = require('../utils')


// @desc Gets All Products
// @route GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();


        // Can use writeHead(status, Object w/ header values)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products)); // JSON must be stringified since HTML response is plain text

    } catch (error) {
        console.log(error)
    }
}

// @desc Gets Single Product
// @route GET /api/products/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findByID(id);

        if (!product) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Product not found.'}))
        } else {       
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(product));
        }

    } catch (error) {
        console.log(error)
    }
}

// @desc Create a Product
// @route POST /api/products
async function createProduct(req, res) {
    try {
        // Read body using utils function
        const body = await getPostData(req);

        const { title, description, price } = JSON.parse(body);

        const product = {
            title,
            description,
            price,
        }

        const newProduct = await Product.create(product); 

        res.writeHead(201, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(newProduct))

    } catch (error) {
        console.log(error);
    }
}

// @desc Update a product given id param
// @route PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        // Find product using utils function
        const product = await Product.findByID(id);

        if (!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            // Get req body data using utils function
            const body = await getPostData(req);

            const { title, description, price } = JSON.parse(body);

            const productData = {
                title: title || product.title, // use new title if there is one, otherwise keep existing
                description: description || product.description,
                price: price|| product.price,
            }

            const updatedProduct = await Product.update(id, productData);

            res.writeHead(200, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(updatedProduct))

        }
        
    } catch (error) {
        console.error(error);
    }
}

// @desc Remove product
// @route DELETE /api/products/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findByID(id);

        if (!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            await Product.remove(id);
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({ message: 'Product Removed'}))
        }

    } catch (error) {

    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}