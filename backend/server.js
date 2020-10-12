// bring in expess, using common js module not es6
import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'

dotenv.config()

const app = express()

//If we get a request for '/' then we running a function that takes in a request and response object
app.get('/', (req, res) => {
    res.send('API is running...')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))