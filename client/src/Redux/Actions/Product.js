import axios from "axios"
import {
    PRODUCT_LIST_REQ,
    PRODUCT_LIST_REQ_SUCCESS,
    PRODUCT_LIST_REQ_FAIL,

    PRODUCT_DETAIL_REQ,
    PRODUCT_DETAIL_REQ_SUCCESS,
    PRODUCT_DETAIL_REQ_FAIL,

    PRODUCT_DELETE_REQ ,
    PRODUCT_DELETE_REQ_SUCCESS ,
    PRODUCT_DELETE_REQ_FAIL
} from "../Constants/Product.js"

import {BASE_URL} from "../Constants/BASE_URL.js"



export const productListAction = () => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQ });
  
      const { data } = await axios.get(`${BASE_URL}/api/products`);
      console.log('API Response:', data); // Check if it's the expected format
  
      // Ensure the products field is passed correctly
      dispatch({ type: PRODUCT_LIST_REQ_SUCCESS, payload: data.products }); // Adjust to data.products if needed
    } catch (error) {
      console.error('Error fetching products:', error); // Log error
      dispatch({
        type: PRODUCT_LIST_REQ_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
  




export const productAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQ });
        const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
        dispatch({ type: PRODUCT_DETAIL_REQ_SUCCESS, payload: data.product})
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_REQ_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}
//delete 
export const productDeleteAction = (id) => async (dispatch, getState) => {

  try {
    dispatch({ type: PRODUCT_DELETE_REQ });

    // Retrieve the user's token from the Redux state
    const userInfo = getState().userLoginReducer.userInfo;

    // Set up the config object with the Authorization header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`, // Ensure the token is included
      },
    };
    console.log(userInfo.token);
    

    // Make the API call to delete the product
    const { data } = await axios.delete(
      `${BASE_URL}/api/products/${id}`,
      config
    );
    console.log("api",data);
    

   
    dispatch({
      type: PRODUCT_DELETE_REQ_SUCCESS,
      payload: id, 
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    

    // Dispatch failure action with the error message
    dispatch({
      type: PRODUCT_DELETE_REQ_FAIL,
      payload: message,
    });
  }
};




