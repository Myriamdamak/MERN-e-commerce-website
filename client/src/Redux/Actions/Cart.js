import axios from "axios";
import {
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
  
    CART_SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD
} from "../Constants/Cart.js"

import { BASE_URL } from "../Constants/BASE_URL.js";


export const addToCartAction = (id, qty) => async (dispatch, getState) => {
    try { 
        const { data } = await axios.get(`${BASE_URL}/api/products/${id}`)
        dispatch({
            type: ADD_ITEM_TO_CART,
            payload: {
                product: data.product._id,
                name: data.product.name,
                image: data.product.image,
                price: data.product.price,
                countInStock: data.product.countInStock,
                qty
            }
        })

        const cartItems = getState().cartReducer.cartItems;
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        
    } catch (error) {
        console.log(error)
    }
}
export const removeFromCartAction = (id) => (dispatch, getState) => {
    const state = getState();
    console.log("State:", state);  // Debug the state
    const cartItems = state.cart ? state.cart.cartItems : [];
    console.log("Cart Items:", cartItems);  // Debug cart items
  
    dispatch({
      type: REMOVE_ITEM_FROM_CART,
      payload: id
    });
  
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  

/*export const removeFromCartAction = (id) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload:id
    })

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems) )
}*/


export const saveShippingAddressAction = (data) => (dispatch) => {
    console.log("Function is called", data);
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,

        payload:data.order.shippingAddress
     })
     

    localStorage.setItem("shippingAddress", JSON.stringify(data.order.shippingAddress))
}



export const savePaymentMethodAction = (data) => (dispatch) => {
    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem("paymentMethod", JSON.stringify(data))
}