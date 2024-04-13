import { useState, useEffect } from 'react'
import { useAppSelector, useThunkDispatch } from '../redux/hooks';
import { fetchProducts } from '../redux/actions/productActions';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
    const productState = useAppSelector((state) => state.product);
    // console.log({ productState })
    const products = productState.productList;
    const { loading, success, message } = productState.request
    const dispatch = useThunkDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <>
            {loading === true && success === false ? (
                <Loader />
            ) : loading === true && success === false && message.length ? (
                <Message variant='danger'>
                    {message}
                </Message>
            ) : (
                <>
                    <h1>Latest Products</h1>
                    <Row>
                        {products.map(product => (
                            <Row key={product._id}>
                                <Product product={product} sm={12} md={6} lg={4} xl={3} />
                            </Row>
                        ))}
                    </Row>
                </>
            )}
        </>

    )
}

export default HomeScreen