// Utility functions
// For example, writing to another file
// Use this to separate useful functions from more complex model functions

const fs = require('fs');

function writeDataToFile(data) {
    fs.writeFile('./data/products.json', JSON.stringify(data), err => {
        if (err) {
            console.error(err);
        } else {
            // file written successfully
        }
    })
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            });
        
            req.on('end', () => {
                resolve(body);
            })        
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    writeDataToFile,
    getPostData
}