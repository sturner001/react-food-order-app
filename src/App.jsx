import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import { CartContextProvider } from './store/CartContext.jsx';
import UserProgressContext from './store/UserProgressContext.jsx';
function App() {
  return (
      <UserProgressContext>
        <CartContextProvider>
          <Header />
          <Meals />
        </CartContextProvider>
      </UserProgressContext>
  );
}

export default App;
