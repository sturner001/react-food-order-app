import Modal from './UI/Modal.jsx';
import CartContext from '../store/CartContext.jsx';
import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Cart() {
    const cartContext = useContext(CartContext);
const userProgressContext = useContext(UserProgressContext); 
    const orderTotalCost = cartContext.items.reduce((totalCost, item) => {
        return totalCost + item.price * item.quantity

    }, 0);

    return (
        <Modal className="cart">
            <h2>Your Cart</h2>
            <ul>
                {cartContext.items.map((item) => {
                    <li key={item.id}>
                        {item.name} - {item.quantity}
                    </li>
                }
                )}

            </ul>
            <p className="cart-total">{currencyFormatter.format(orderTotalCost)} </p>
            <p className='modal-actions'>
                <Button textOnly>Close</Button>
                <Button >Go to Checkout</Button>

            </p>
        </Modal>
    );
}