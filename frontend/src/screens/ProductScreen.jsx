import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useAppSelector, useThunkDispatch } from '../redux/hooks';
import { fetchProductById } from '../redux/actions/productActions';
import { addItemToCart } from '../redux/actions/cartActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useThunkDispatch();

    const [qty, setQty] = useState(1);

    const productState = useAppSelector((state) => state.product);
    const product = productState.productDetails;
    const { loading, success, message } = productState.request;
    // console.log(product)
    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id])

    const addToCartHandler = () => {
        dispatch(addItemToCart({ ...product, qty }))
        navigate('/cart')
    }

    return (
        <>
            {loading === true && success === false ? (
                <Loader />
            ) : loading === true && success === false && message.length ? (
                <Message />
            ) : (
                <> 
                    <button><Link to='/'>Go Back</Link></button>
                    <Row>
                        <Col md={5}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {/* <Rating value={product.rating} text={`${product.numReviews} reviews`} /> */}
                                </ListGroup.Item>
                                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control as='select' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                                                        {[...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button
                                            className="btn-block"
                                            type='button'
                                            disabled={product.countInStock === 0}
                                            onClick={addToCartHandler}
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>

    )
}
export default ProductScreen;