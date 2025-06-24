import Modal from './UI/Modal.jsx';
import CartContext from '../store/CartContext.jsx';
import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

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
                {cartCxt.items.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.quantity}
                    </li>
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