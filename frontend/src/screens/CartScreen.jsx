//map through products in cart
// show subtotal
// button to proceed to checkout
// Challenge: store cart in db
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addItemToCart, removeItemFromCart } from '../redux/actions/cartActions';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardContent, Button, Select, MenuItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Message from '../components/Message';

const CartScreen = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const cartState = useAppSelector(state => state.cart);
    const { cartItems, subTotal } = cartState;


    const updateItemQuantity = (item, qty) => {
        dispatch(addItemToCart({ ...item, qty }))
    }

    const removeItem = (id) => {
        dispatch(removeItemFromCart({ id }))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping')
    }

    return (
        <Grid container spacing={2}>
            <Grid item md={8}>
                <Typography variant="h4" gutterBottom>
                    Shopping Cart
                </Typography>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty <Link to='/'>Continue Shopping</Link>
                    </Message>
                ) : (
                    cartItems.map(item => (
                        <Card key={item._id} sx={{ mb: 2 }}>
                            <CardContent>
                                <Grid container alignItems='center' spacing={2}>
                                    <Grid item md={2}>
                                        <img src={item.image} alt={item.image} style={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item md={3}>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Grid>
                                    <Grid item md={2}>
                                        ${item.price}
                                    </Grid>
                                    <Grid item md={2}>
                                        <Select value={item.qty} onChange={(e) => updateItemQuantity(item, Number(e.target.value))} fullWidth>
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Select>
                                    </Grid>
                                    <Grid item md={2}>
                                        <IconButton onClick={() => removeItem(item._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Grid>
            <Grid item md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">
                            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                        </Typography>
                        {subTotal}
                        <Box sx={{ mt: 2 }}>
                            <Button
                                variant='contained'
                                fullWidth
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed to Checkout
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>


        </Grid>
    )
}

export default CartScreen