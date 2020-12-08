import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const initialState={};
if(localStorage.getItem('cartItems')){
    initialState.cart = {
        items:JSON.parse(localStorage.getItem('cartItems'))
    }
}

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
