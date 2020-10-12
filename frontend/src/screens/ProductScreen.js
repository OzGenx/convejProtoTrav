import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'
// import Product from '../components/Product'

const ProductScreen = ({ match }) => {
    const [product, setProduct] = useState({})

    /* useEffect makes a request to the back end 
        whatever we put inside the function runs as soon as the component loads
    */
    useEffect (() => {
        const fetchProduct = async () => {
            const {data }= await axios.get(`/api/products/${match.params.id}`)

            setProduct(data)
        }

        fetchProduct ()
    }, [match])    

    return <>
    <Link className='btn btn-dark my-3' to='/' exact> GO BACK</Link>
    <Row>
        <Col sm={12} md={8} lg={4}>
        {/* fluid keeps the image in its container */}
            <Image src={product.image} alt={product.name} fluid></Image>
        </Col>
        
        <Col sm={12} md={8} lg={4}>
            {/* Variant of flush takes away the border */}
            <ListGroup variant='flush'>
                
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>

                <ListGroup.Item>
                    Price: ${product.price}
                </ListGroup.Item>

                <ListGroup.Item>
                    <strong>Description:</strong> {product.description}
                </ListGroup.Item>

            </ListGroup>
        </Col>

         <Col sm={12} md={6} lg={3} >
            <Card variant='flush'>
                <ListGroup.Item>
                    <Row>
                        <Col>
                            Price: 
                        </Col>

                        <Col>
                            <strong>${product.price} </strong>
                        </Col>
                    </Row>
                    
                    <ListGroup.Item>
                    <Row>
                        <Col>
                            Availability: 
                        </Col>

                        <Col>
                            {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                        </Col>
                    </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        {/* block class strecthes all the way across */}
                        <Button className='btn-block' type='button' disabled={product.countInStock === 0}> ADD TO CART</Button>
                    </ListGroup.Item>


                </ListGroup.Item>
            </Card>
        </Col>
    </Row>
        </>
   
}

export default ProductScreen
