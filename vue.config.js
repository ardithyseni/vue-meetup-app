module.exports = {
    devServer: {
        proxy: {
            '^/api' : {
                target: 'http://localhost:3001',
                ws: true,
                secure: false
            }
        }
    }
}

// the caret ^  is a wildcard to proxy any link into 3001

// http://localhost:8080/api/v1/categories

// http://localhost:3001/api/v1/categories