const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state) => {
    const subTotal = addDecimal(state.cartItems.reduce((acc, item) => acc + (item.price * Number(item.qty)), 0))

    const shippingCost = addDecimal(subTotal > 100 ? 0 : 10);

    const taxPrice = addDecimal(Number(subTotal * 0.15).toFixed(2));

    const cartTotal = (Number(subTotal) + Number(shippingCost) + Number(taxPrice)).toFixed(2);

    const newState = { ...state, subTotal, shippingCost, taxPrice, cartTotal };
    console.log(newState);
    localStorage.setItem('cart', JSON.stringify(newState));

    return newState;
}