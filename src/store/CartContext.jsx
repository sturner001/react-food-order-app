import { createContext, useReducer } from 'react';

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },

});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        // determine if a an item already exists in state
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        // extract a collection of items from state
        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) { // the items is aready in state 
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1 // then we incriment the quantity property
            }
            // then we overwrite the old item in the updatedItems collection  
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }
        return { ...state, items: updatedItems };
    }
    if (action.type === 'REMOVE_ITEM') {
        // get the index of the item in state
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        // pull a temp collection
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];

        if (existingCartItem.quantity === 1) {
            // if the quantity is 1 we remove the item from the collection
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            // otherwise we decriment quantity count 
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return { ...state, items: updatedItems };
    }
    return { state };
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item });
    }

    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem
    };

    console.log(cartContext);

    return (
        <CartContext.Provider value={cartContext} >{children}</CartContext.Provider>
    );
}

export default CartContext;