import {combineReducers} from 'redux';
import cartReducer from './cartReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer
});
export default rootReducer;