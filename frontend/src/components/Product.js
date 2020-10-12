import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

            /* parsing in a prop using destructuring, 
            an alternative is to parse in (prop) and then prop.product.image . . .
            instead of ({ product }) */
const Product = ({ product }) => {
    return (
        <Card className = 'my-3 p-3 rounded' /* margin top and bottom of 3, padding of 3 all round  */ >
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                <Card.Title as='div'><strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <Rating value={product.rating} 
                text={`${product.numReviews} reviews`} 
                 />
            </Card.Text>

            <Card.Text as='h4'>${product.price}         
            </Card.Text>
            </Card.Body>
            
        </Card>
    )
}

export default Product
