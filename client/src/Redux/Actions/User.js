import axios from "axios";

import {
    USER_LOGIN_REQ,
    USER_LOGIN_REQ_FAIL,
    USER_LOGIN_REQ_SUCCESS,

    USER_LOGOUT,
    USER_REGISTER_REQ,
    USER_REGISTER_REQ_FAIL,
    USER_REGISTER_REQ_SUCCESS,

    USER_DETAIL_REQ,
    USER_DETAIL_REQ_FAIL,
    USER_DETAIL_REQ_SUCCESS,

    USER_LIST_REQ_FAIL,
    USER_LIST_REQ_SUCCESS,
    USER_LIST_REQ,

    USER_DELETE_REQ,
    USER_DELETE_REQ_FAIL,
    USER_DELETE_REQ_SUCCESS,


} from "../Constants/User.js"
import { BASE_URL } from "../Constants/BASE_URL.js";


//user login action 

export const userLoginAction = (email, password) => async (dispatch)=>{
    try {
        dispatch({ type: USER_LOGIN_REQ })
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const { data } = await axios.post(`${BASE_URL}/api/login`, { email, password }, config);

        dispatch({ type: USER_LOGIN_REQ_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        localStorage.setItem("token", data.token);



    } catch (error) {
        dispatch({
            type: USER_LOGIN_REQ_FAIL,
            payload: error.response.data.message
       })
    }
}


//user logout action 
export const userLogoutAction = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT })
    document.location.href = "/login"
};


//register 
export const userRegisterAction = (userName, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQ });
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }


        const { data } = await axios.post(`${BASE_URL}/api/users`, { userName, email, password }, config);

        dispatch({ type: USER_REGISTER_REQ_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_REQ_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data))


     } catch (error) {
        dispatch({
            type: USER_REGISTER_REQ_FAIL,
            payload: error.response.data.message
        })
    }
}

//GET user by id
export const userAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAIL_REQ });
        const { data } = await axios.get(`${BASE_URL}/api/users/${id}`);
        dispatch({ type: USER_DETAIL_REQ_SUCCESS, payload: { userName: data.userName, userId: data.id } });
    } catch (error) {
        dispatch({
            type: USER_DETAIL_REQ_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}

//list all users
export const userListAction = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LIST_REQ });
        const { data } = await axios.get(`${BASE_URL}/api/users`);
        dispatch({ type: USER_LIST_REQ_SUCCESS, payload: data.users }); // Adjust to data.products if needed
    } catch (error) {
      console.error('Error fetching products:', error); // Log error
      dispatch({
        type: USER_LIST_REQ_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };


  //delete a user
  export const userDeleteAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQ });

    // Making the API call to delete the user
    await axios.delete(`${BASE_URL}/api/users/${id}`);

    // Dispatch success action with the user ID to remove it from the state
    dispatch({
      type: USER_DELETE_REQ_SUCCESS,
      payload: id, // Passing the user ID for the reducer to know which user to remove
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_REQ_FAIL,
      payload: error.message, // Handle the error message to be shown in the UI
    });
  }
};