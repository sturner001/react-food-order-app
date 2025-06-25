import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting.js";
import Input from './Input.jsx';
import UserProgressContext from "../store/UserProgressContext.jsx";
import Button from './UI/Button.jsx'
export default function Checkout() {
    const cartCxt = useContext(CartContext);
    const userProgressCxt = useContext(UserProgressContext);

    const cartTotalCost = cartCxt.items.reduce(
        (totalCost, item) => totalCost + item.price * item.quantity,
        0
    );

    function handleClose() {
        userProgressCxt.hideCheckout();
    }

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());


        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartCxt.items,
                    customer: customerData
                }
            })
        });
    }

    return (
        <Modal open={userProgressCxt.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotalCost)}</p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="E-mail Address" type="email" id="email" />
                <Input label="Street Address" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                <p className="modal-actions">
                    <Button onClick={handleClose} type="button" textOnly>Close</Button>
                    <Button>Submit Order</Button>

                </p>
            </form>
        </Modal>
    );

}