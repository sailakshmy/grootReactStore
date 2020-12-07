import React,{Component} from 'react';
import '../App.css';
//import Navbar from './Navbar';
import SearchForm from './SearchForm';
import {API_KEY} from '../Config';
import Products from './Products';
//import Product from './Product';

class Homepage extends Component {
  state={
    products:[]
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
      products: data.products
    });
    console.log(this.state.products[0].asin);
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
    console.log(data);
    this.setState({
      products: data.products
    });
  }
  render(){
   return (
      <div style={{textAlign:'center'}}>
        
          <SearchForm onClickSearchProduct={this.onClickSearchProduct}/>
          <Products products={this.state.products}/>
   
      </div>
    );
  }

}

export default Homepage;
