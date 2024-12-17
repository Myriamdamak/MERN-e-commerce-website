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


export const userListAction = () => async (dispatch) => {
  
  try {
      dispatch({ type: USER_LIST_REQ });
      const response = await axios.get(`${BASE_URL}/api/users`);
      console.log(response); // This will show the entire response
      const { data } = response;
    
      dispatch({ type: USER_LIST_REQ_SUCCESS, payload: data.users });
  } catch (error) {
    console.error('Error fetching users:', error); // Log error
    dispatch({
      type: USER_LIST_REQ_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


  //delete a user
  export const userDeleteAction = (id) => async (dispatch, getState) => {
  
    try {
      dispatch({ type: USER_DELETE_REQ });
  
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
      
  
      // Make the API call to delete the user
      const { data } = await axios.delete(
        `${BASE_URL}/api/users/${id}`,
        config
      );
      console.log("api",data);
      
  
     
      dispatch({
        type: USER_DELETE_REQ_SUCCESS,
        payload: id, 
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
  
      
  
      // Dispatch failure action with the error message
      dispatch({
        type: USER_DELETE_REQ_FAIL,
        payload: message,
      });
    }
  };
  
  
  
  
  