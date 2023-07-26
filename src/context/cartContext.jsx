const CartContext = () => {
  if ([].length === 0) {
    return (
      <section>
        <header>Your Cart</header>
        <h4>is currently empty</h4>
      </section>
    );
  }
  return (
    <section className='cart'>
      <header>
        <h2>Your cart</h2>
      </header>
    </section>
  );
};
export default CartContext;
