import React,{Component} from 'react';
import '../App.css';
//import Navbar from './Navbar';
//import SearchForm from './SearchForm';
import {API_KEY} from '../Config';
import Products from './Products';
//import Product from './Product';
import FilterForm from './FilterForm';
import Basket from './Basket';

class Homepage extends Component {
  state={
    products:[],
    filteredProducts:[],
    sort:'',
    cartItems:[]
  }
  //This is to handle the search functionality
  onClickSearchProduct= async (e)=>{
    e.preventDefault();
    const productName = e.target.elements.productName.value;
    console.log(productName);
    const api_call = await fetch(`https://amazon-product-reviews-keywords.p.rapidapi.com/product/search?keyword=${productName}&category=aps&country=US`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "amazon-product-reviews-keywords.p.rapidapi.com"
      }
    });
    const data =await api_call.json();
    console.log(data);
    this.setState({
      products: data.products,
      filteredProducts: data.products
    });
    console.log(this.state.products[0].asin);
  }
  handleChangeSort=(e)=>{
    console.log(e.target.value);
    this.setState({sort: e.target.value});
    this.listProducts();
  }
  listProducts=()=>{
    this.setState(state=>{
      if(state.sort !== ''){
        state.products.sort((a,b)=>(state.sort==='highest')?(a.price.current_price < b.price.current_price ? 1: -1):
                                                          (a.price.current_price > b.price.current_price ? 1:-1 ))
      }
      return{filteredProducts: state.products};
    })
  };
  addToCart = (e,product) =>{
    this.setState(state=>{
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;
      cartItems.forEach((item)=>{
        if(item.asin === product.asin){
          productAlreadyInCart = true;
          item.count++;
        }
      });
      if(!productAlreadyInCart){
        cartItems.push({...product, count:1});
      }
      //To save in LocalStorage
      localStorage.setItem("cartItems",JSON.stringify(cartItems));
      return cartItems;
    });
  }
  removeFromCart=(e,item)=>{
    this.setState(state=>{
      /*//console.log(state.cartItems);
      //console.log(item);
      const cartItems = state.cartItems.filter(prod => {
        console.log(prod.asin);
        console.log(item.asin);

        return item.asin !== prod.asin

      });
      console.log(cartItems);
      localStorage.setItem("cartItems",JSON.stringify(cartItems));
      return cartItems;
*/
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;
      let newCartItems = state.cartItems;
      cartItems.forEach((product)=>{
        console.log(item.count);
        if(item.count <= 1){
          newCartItems = cartItems.filter(prod => {
            // console.log(prod.asin);
             //console.log(item.asin);
     
             return item.asin !== prod.asin
     
           });
        }
        if(item.asin === product.asin){
          productAlreadyInCart = true;
          item.count--;
        }
      });
      if(!productAlreadyInCart){
        newCartItems = cartItems.filter(prod => {
         // console.log(prod.asin);
          //console.log(item.asin);
  
          return item.asin !== prod.asin
  
        });
       
      }
      //To save in LocalStorage
      localStorage.setItem("cartItems",JSON.stringify(newCartItems));
      return newCartItems;
    });
  }
  componentDidMount= async()=>{
    const api_call = await fetch(`https://amazon-product-reviews-keywords.p.rapidapi.com/product/search?keyword=phones&category=aps&country=US`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "amazon-product-reviews-keywords.p.rapidapi.com"
      }
    });
    
    const data =await api_call.json();
    //console.log(data);
    this.setState({
      products: data.products,
      filteredProducts: data.products
    });
    //console.log(this.state.products);
    if(localStorage.getItem('cartItems')){
      this.setState({cartItems: JSON.parse(localStorage.getItem('cartItems'))});
    }
  }
  render(){
   return (
      <div style={{textAlign:'center'}} className="container">
        <div className="row">
            <div className="col-md-8">
                {/*<SearchForm onClickSearchProduct={this.onClickSearchProduct}/>*/}
                <FilterForm sort={this.state.sort} handleChangeSort={this.handleChangeSort}/>
                <Products products={this.state.products} addToCart={this.addToCart}/>  
            </div>
            <div className="col-md-4">
              <Basket cartItems={this.state.cartItems} removeFromCart={this.removeFromCart}/>
            </div>
        </div>
      </div>
    );
  }

}

export default Homepage;
