import {
    USER_LOGIN_REQ,
    USER_LOGIN_REQ_SUCCESS,
    USER_LOGIN_REQ_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQ,
    USER_REGISTER_REQ_SUCCESS,
    USER_REGISTER_REQ_FAIL,

    USER_DETAIL_REQ,
    USER_DETAIL_REQ_SUCCESS,
    USER_DETAIL_REQ_FAIL,

    USER_LIST_REQ_FAIL,
    USER_LIST_REQ_SUCCESS,
    USER_LIST_REQ,

   USER_DELETE_REQ_SUCCESS,
   USER_DELETE_REQ_FAIL



} from "../Constants/User.js"


//user login

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQ:
            return { loading: true }
        case USER_LOGIN_REQ_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_REQ_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

//user REgister


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQ:
            return { loading: true }
        case USER_REGISTER_REQ_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_REQ_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}
// userReducer.js


  
const initialState = {
    userName: '',       
    userId: '',          
    loading: false,     
    error: null,        
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_DETAIL_REQ:
        return {
          ...state,
          loading: true,
        };
  
      case USER_DETAIL_REQ_SUCCESS:
        return {
          ...state,
          loading: false,
          userName: action.payload.userName,  // Store the userName
          userId: action.payload.userId,      // Store the userId
        };
  
      case USER_DETAIL_REQ_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,  // Store the error message
        };
  
      default:
        return state;
    }
  };

//user list with deletion
  export const userListReducer = (state = {users: []}, action) => {
    switch (action.type) {
      case USER_LIST_REQ:
        return { ...state, loading: true };
      case USER_LIST_REQ_SUCCESS:
        return { ...state, loading: false, users: action.payload };
      case USER_LIST_REQ_FAIL:
        return { ...state, loading: false, error: action.payload };
      case USER_DELETE_REQ_SUCCESS:
        return {
          ...state,
          users: (state.users || []).filter(user => user._id !== action.payload),
        };
      case USER_DELETE_REQ_FAIL:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  