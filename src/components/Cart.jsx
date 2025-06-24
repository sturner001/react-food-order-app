import Modal from './UI/Modal.jsx';
import CartContext from '../store/CartContext.jsx';
import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import CartItem from './CartItem.jsx';

export default function Cart() {
    const cartCxt = useContext(CartContext);
    const userProgressCxt = useContext(UserProgressContext);

    const cartTotalCost = cartCxt.items.reduce(
        (totalCost, item) => totalCost + item.price * item.quantity,
        0
    );

    function handleCloseCart() {
        userProgressCxt.hideCart();
    }

    



    return (
        <Modal className="cart" open={userProgressCxt.progress === 'cart'}>
            <h2>Your Cart</h2>
            <ul>

                {cartCxt.items.map((item) =>
                (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => cartCxt.addItem(item)}
                        onDecrease={() => cartCxt.removeItem(item.id)}
                    />
                ))}

            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotalCost)} </p>
            <p className='modal-actions'>
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                <Button onClick={handleCloseCart} >Go to Checkout</Button>

            </p>
        </Modal>
    );
}