export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};
export const updateCart = (state) => {
  // Calculate items Price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // Calculate shipping Price(if order amount is over $200 then free ,otherwise $10 shipping)
  state.shippingPrice = addDecimals(state.itemsPrice > 200 ? 0 : 10);
  // Calculate tax Price(5% tax)
  console.log(typeof state.itemsPrice);
  state.taxPrice = addDecimals(
    Number((0.05 * Number(state.itemsPrice)).toFixed(2))
  );
  // Calculate total Price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.taxPrice) +
    Number(state.shippingPrice)
  ).toFixed(2);

  localStorage.setItem('cart', JSON.stringify(state));
  return state;
};
