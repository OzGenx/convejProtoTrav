import React, { useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { listProducts } from '../actions/productActions'




const HomeScreen = () => {
    const dispatch = useDispatch()

    const productList =useSelector(state => state.productList)
    const { loading, error, products } = productList
   

    /* useEffect makes a request to the back end 
        whatever we put inside the function runs as soon as the component loads
    */
    useEffect (() => {
        dispatch(listProducts())
        
    }, [dispatch])   
    
     return (
        <>
            <h1>Latest Products</h1>
    {loading ? <Loader /> : error ? <Message variant='danger'>{error} </Message> : <Row>
                {products.map( product => (
                <Col key={product._id} sm={12} /* small screens 12 columns*/ md={6} lg={4}>
                    <Product product={product} />
                </Col>
                ))}
                
            </Row>}
     
        </>
    )
}

export default HomeScreen
