import { useContext } from 'react';
import logoImage from '../assets/logo.jpg'
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const totalCartItems = cartContext.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart() {
        userProgressContext.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImage} alt="React Food logo" />
                <h1>React Food</h1>
            </div>
            <nav>
                <Button onClick={handleShowCart} textOnly >
                    Cart ({totalCartItems})
                    </Button>
            </nav>
        </header>

    );
}