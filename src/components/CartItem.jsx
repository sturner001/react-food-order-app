
import { currencyFormatter } from "../util/formatting";
import { useContext } from "react";
import CartContext from "../store/CartContext";

export default function CartItem({ name, quantity, price, onIncrease, onDecrease }) {
    const cartCxt = useContext(CartContext);

   

    return (
        <li className="cart-item">
            <p>
                {name} - {quantity} X {currencyFormatter.format(price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
    );

}