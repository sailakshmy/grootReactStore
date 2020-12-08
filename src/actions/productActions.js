import { FETCH_PRODUCTS } from "./types";
import {API_KEY} from '../Config';

//import {FETCH_PRODUCTS} from './types';
export const fetchProducts = () =>{
    return (dispatch,getState)=>{
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://amazon-product-reviews-keywords.p.rapidapi.com/product/search?keyword=phones&category=aps&country=US"; // site that doesn’t send Access-Control-*
    fetch(url, {
        "mode":'cors',
      "method": "GET",
      "headers": {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "amazon-product-reviews-keywords.p.rapidapi.com",
        "Access-Control-Allow-Origin":'http://localhost:3000',
        "Access-Control-Allow-Credentials":true

      }
    }).then(res=>res.json())
      .then(data=>{
         // console.log(data);
        dispatch({type:FETCH_PRODUCTS, payload:data});
    }).catch(err=>console.log(err));
}
}

export const searchProducts = () =>{
    return (dispatch,getState)=>{
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://amazon-product-reviews-keywords.p.rapidapi.com/product/search?keyword=phones&category=aps&country=US"; // site that doesn’t send Access-Control-*
    fetch(url, {
        "mode":'cors',
      "method": "GET",
      "headers": {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "amazon-product-reviews-keywords.p.rapidapi.com",
        "Access-Control-Allow-Origin":'http://localhost:3000',
        "Access-Control-Allow-Credentials":true

      }
    }).then(res=>res.json())
      .then(data=>{
         // console.log(data);
        dispatch({type:FETCH_PRODUCTS, payload:data});
    }).catch(err=>console.log(err));
}
}