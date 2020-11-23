import React, {useState } from 'react'
import { Form, Button, Row, Col, ListGroup, Image, Card, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

const PlaceOrderScreen = () => {

    const cart = useSelector(state => state.cart)

    
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    // caluculate price

    // second argument is a 0 which is te start of the accumulator acc
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)

    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const placeOrderHandler = () => {

    }


    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong> Address </strong>
                                {cart.shippingAddress.address}, 
                                {cart.shippingAddress.city},
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        
                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                    
                                            <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th md={2}>image</th>
                                        <th md={5}>Product</th>
                                        <th md={1}>Qty</th>
                                        <th md={2}>Unit Price</th>
                                        <th md={2}>Total</th>
                                        </tr>
                                    </thead>

                                        {cart.cartItems.map((item, index) => (
                                            
                                            <tbody key={index}>
                                                <tr>
                                                
                                                    <td>
                                                
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </td>
                                                    <td>
                                                    

                                                   
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    
                                                    </td>

                                                    <td>
                                                    
                                                    {item.qty} </td> 
                                                    <td>${item.price} </td> 
                                                    <td> ${addDecimals(item.qty * item.price)}
                                                    </td>
                                                
                                                
                                                </tr>
                                                </tbody>
                                               
                                        
                                                                 
                                        ))}
                                        </Table>
                                    
                                ) }
                            </ListGroup.Item>
                        
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cart.cartitems === 0} onClick={placeOrderHandler}>
                                        Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            
        </>
    )
}

export default PlaceOrderScreen
