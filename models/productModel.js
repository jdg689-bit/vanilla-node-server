const products = require('../data/products.json');
const { writeDataToFile } = require('../utils.js');
const { v4:uuidv4 } = require('uuid') // From docs

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    })
}

function findByID(id) {
    /* While using a promise here isn't necessary since the function is synchronous,
    doing so futureproofs the function (for example if you later wish to query
    a database)
    */

    return new Promise((resolve, reject) => {
        const product = products.find((product) => product.id === id);
        resolve(product);
    })
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(), ...product}
        products.push(newProduct);

        writeDataToFile(products);
        resolve(newProduct);

    })
}

function update(id, productData) {
    return new Promise((resolve, reject) => {

        // Find index of product to update
        const index = products.findIndex((product) => product.id === id);
        products[index] = {id, ...productData};

        writeDataToFile(products);
        resolve(products[index]);
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((product) => product.id === id);
        products.splice(index, 1) // Remove 1 element, starting at index

        writeDataToFile(products);
        resolve(products);
    })
}

module.exports = {
    findAll,
    findByID, 
    create,
    update,
    remove,
}