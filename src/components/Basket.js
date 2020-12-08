import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import { removeFromCart } from '../actions/cartActions';
import StripeCheckout from 'react-stripe-checkout';
//import {STRIPE_KEY} from '../Config';
import axios from 'axios';
import {toast} from 'react-toastify';

toast.configure();

class Basket extends Component {
     handleToken= async (token,addresses)=>{
        //const cartItems = this.props.cartItems;
            console.log(token);
            console.log(addresses);
            const response =await axios.post('http://localhost:8000/checkout',{
                token               
            });
            const {status} = response.data;
            if(status==='success')
                toast('Success! Check email for details',{type:"success"});
            else{
                toast('Something went wrong',{type:"error"});
            }
            this.setState({
                cartItems:[]
            });
            localStorage.clear("cartItems");
    }
    render() {
        const cartItems = this.props.cartItems; 
        //console.log(this.props.cartItems.length);
        //console.log(cartItems.length);
        return (
            <div className="alert alert-info">
               {cartItems && cartItems.length === 0 ? "Please add items to cart." : 
                                        cartItems.length === 1 ?
                                             <div>There is {cartItems.length} item in the cart.</div> :
                                             <div>There are {cartItems.length} items in the cart.</div>}
                {cartItems.length > 0 && <div>
                                            <ul>
                                                {cartItems.map(item=>{
                                                    return(
                                                    <li key={item.asin}>
                                                        <b>{item.title.length <= 20 ? item.title :
                                                            item.title.substring(0,20)}</b>
                                                         x {item.count} = {item.price.currency} {item.count > 0 ? item.price.current_price*item.count : 0}
                                                        <button className="btn btn-danger" onClick={()=>this.props.removeFromCart(this.props.cartItems,item)}>X</button>
                                                    </li>
                                                    )
                                                })}
                                            </ul>
                                            Total cart value=USD {cartItems.reduce((a,c)=>a+c.price.current_price*c.count, 0)}
                                            {cartItems.length !== 0 ? <StripeCheckout 
                                                                        stripeKey="pk_test_51Hw2rtFDPRsaKgnNQuAtcqwW6EMNWhPEK7hCHtELqiexJOgjCAieME6sovjAfZOKuoJ76zz6FjaBegP89CZXuAHk00G0l5yEdK"
                                                                        token={this.handleToken}
                                                                        billingAddress
                                                                        shippingAddress
                                                                        amount={cartItems.reduce((a,c)=>a+c.price.current_price*c.count*100, 0)}/> : null}
                                            {/* <button className="form__button" 
                                            onClick={()=>alert('Checkout feature yet to be Implemented')}>
                                                
                                            </button> : null */}
                                        </div>}
            </div>
        )
    }
}
/*const mapStateToProps=(state)=>{
    console.log(state);
    console.log(state.cart.items);
    return{
        cartItems: state.cart.items
    }
}
/*const mapDispatchToProps=(dispatch)=>{
    return{
        removeFromCart:(items, item) =>dispatch(removeFromCart(items,item))
    }
}*/

export default Basket;
// connect(mapStateToProps)(Basket);