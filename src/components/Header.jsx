import { useContext } from 'react';
import logoImage from '../assets/logo.jpg'
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';

export default function Header() {
    const cartContext = useContext(CartContext);
    const totalCartItems = cartContext.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImage} alt="React Food logo" />
                <h1>React Food</h1>
            </div>
            <nav>
                <Button textOnly >Cart ({totalCartItems})</Button>
            </nav>
        </header>

    );

}