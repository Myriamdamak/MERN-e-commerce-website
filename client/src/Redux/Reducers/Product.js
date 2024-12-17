import {
  PRODUCT_LIST_REQ,
  PRODUCT_LIST_REQ_SUCCESS,
  PRODUCT_LIST_REQ_FAIL,
  PRODUCT_DETAIL_REQ,
  PRODUCT_DETAIL_REQ_FAIL,
  PRODUCT_DETAIL_REQ_SUCCESS,

  PRODUCT_DELETE_REQ_SUCCESS,
  PRODUCT_DELETE_REQ_FAIL,
} from "../Constants/Product.js";



// export const productListReducer = (state = { products: [] }, action) => {
//     switch (action.type) {
//       case PRODUCT_LIST_REQ:
//         return { loading: true, products: [] };
  
//       case PRODUCT_LIST_REQ_SUCCESS:
//         console.log(action.payload);
//         return { loading: false, products: action.payload }; 
       
//       case PRODUCT_LIST_REQ_FAIL:
//         return { loading: false, error: action.payload };
  
//       default:
//         return state;
//     }
//   };

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQ:
      return { ...state, loading: true };
    case PRODUCT_LIST_REQ_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case PRODUCT_LIST_REQ_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PRODUCT_DELETE_REQ_SUCCESS:
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload),
      };
    case PRODUCT_DELETE_REQ_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};


  
  
// single product by id
export const productReducer = (state = { product: {reviews:[]} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQ:
            return {
                loading: true, ...state
            };
        case PRODUCT_DETAIL_REQ_SUCCESS:
            return {
                loading: false, product: action.payload
            }
        case PRODUCT_DETAIL_REQ_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
