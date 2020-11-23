import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public (Public does not require a token to access)
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    
    res.json(products)

})

// @desc Fetch all products
// @route GET /api/products
// @access Public (Public does not require a token to access)
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

        if(product) {
            res.json(product)
        } else {
            //set the status first
            // if you skip line re.status(404) it will be error 500 by default
            res.status(404)
            //then throw in the new Error
            throw new Error('Product not found')
        }

})

// @desc Delete a product
// @route Delete /api/products
// @access Private/ Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

        if(product) {
            await product.remove()
            res.json({ message: 'Product Removed'})
        } else {
            //set the status first
            // if you skip line re.status(404) it will be error 500 by default
            res.status(404)
            //then throw in the new Error
            throw new Error('Product not found')
        }

})

// @desc Create a product
// @route POST /api/products
// @access Private/ Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product ({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample/jpeg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/ Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})



export { getProducts, getProductById, deleteProduct, createProduct, updateProduct }