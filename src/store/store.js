import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import ProductListReducer from "./productListReducer";


const rootReducer = combineReducers({
    products: ProductListReducer,
})


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


export default store