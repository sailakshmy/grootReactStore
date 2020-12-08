import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { removeFromCart } from '../actions/cartActions';


class Basket extends Component {
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
                                                         X {item.count} = {item.price.currency} {item.count > 0 ? item.price.current_price*item.count : 0}
                                                        <button className="btn btn-danger" onClick={()=>this.props.removeFromCart(this.props.cartItems,item)}>X</button>
                                                    </li>
                                                    )
                                                })}
                                            </ul>
                                            Total cart value=USD {cartItems.reduce((a,c)=>a+c.price.current_price*c.count, 0)}
                                            {cartItems.length !== 0 ? <button className="form__button" onClick={()=>alert('Checkout feature yet to be Implemented')}>Checkout</button> : null }
                                        </div>}
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
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

export default connect(mapStateToProps)(Basket);