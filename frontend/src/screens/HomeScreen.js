import React, { useState, useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'


const HomeScreen = () => {
    /* 1 > what we want to call the piece of state i.e products 
        2 > what we want to call the function to modify the state i.e. setProducts
        3 > the default for products is set in useState([]) */
    const [products, setProducts] = useState([])

    /* useEffect makes a request to the back end 
        whatever we put inside the function runs as soon as the component loads
    */
    useEffect (() => {
        const fetchProducts = async () => {
            const {data }= await axios.get('/api/products')

            setProducts(data)
        }

        fetchProducts ()
    }, [])    

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map( product => (
                <Col key={product._id} sm={12} /* small screens 12 columns*/ md={6} lg={4}>
                    <Product product={product} />
                </Col>
                ))}
                
            </Row>
        </>
    )
}

export default HomeScreen
