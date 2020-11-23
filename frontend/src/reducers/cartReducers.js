import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            //checking if product already exists
            const existItem = state.cartItems.find(x => x.product === item.product)

            if(existItem) {
                return {
                    ...state, 
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }

            } else {
                //if it doesnt exist push it to array
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload),
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload, //= shippingAddress to the data we feed in the form
            }

       case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload, 
            }

        default:
            return state
    }
}