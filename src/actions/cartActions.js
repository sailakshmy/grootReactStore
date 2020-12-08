import {ADD_TO_CART,REMOVE_FROM_CART} from './types';

export const addToCart =(items, newItem)=>{
    const cartItems = items.slice();
    console.log(items);
      let productAlreadyInCart = false;
      cartItems.forEach((item)=>{
        if(item.asin === newItem.asin){
            console.log("I am inside 1")
            console.log(item);
          productAlreadyInCart = true;
          item.count+=1;
          console.log(item.count);
        }
      });
      if(!productAlreadyInCart){
          console.log(cartItems);
          console.log(newItem);
        cartItems.push({...newItem, count:1});
      }
      //To save in LocalStorage
      localStorage.setItem("cartItems",JSON.stringify(cartItems));
      return {type:ADD_TO_CART,payload:{
          cartItems:cartItems
      }};
}

export const removeFromCart =(items, removeItem)=>{
    //const cartItems = state.cartItems;
    const cartItems = items.slice();
    let productAlreadyInCart = false;
    let newCartItems =items.slice();
    cartItems.forEach((product)=>{
      console.log(removeItem.count);
      if(removeItem.count <= 1){
        newCartItems = cartItems.filter(prod => {
          // console.log(prod.asin);
           //console.log(item.asin);
   
           return removeItem.asin !== prod.asin
   
         });
      }
      if(removeItem.asin === product.asin){
        productAlreadyInCart = true;
        removeItem.count--;
      }
    });
    if(!productAlreadyInCart){
      newCartItems = cartItems.filter(prod => {
       // console.log(prod.asin);
        //console.log(item.asin);

        return removeItem.asin !== prod.asin

      });
     
    }
    //To save in LocalStorage
    localStorage.setItem("cartItems",JSON.stringify(newCartItems));
    return {type:REMOVE_FROM_CART,payload:{
        cartItems:cartItems
    }};

  }