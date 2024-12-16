import { combineReducers, createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; 
import storage from 'redux-persist/lib/storage/index.js';
import { persistStore, persistReducer } from 'redux-persist';
import { productListReducer, productReducer } from './Reducers/Product.js';
import { userLoginReducer, userRegisterReducer, userListReducer } from './Reducers/User.js';
import { cartReducer } from "./Reducers/Cart.js"
import { orderDetailReducer, orderListReducer, orderPaymentReducer, orderReducer } from './Reducers/Order.js';

const persistConfig = {
    key: 'root',
    storage,
    version: 1
};

const rootReducer = combineReducers({
    productListReducer,
    productReducer,
    userLoginReducer,
    userRegisterReducer,
    userListReducer,
    cartReducer,
    
    orderReducer,
    orderDetailReducer,
    orderPaymentReducer,
    orderListReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk) 
);

export const persistor = persistStore(store);