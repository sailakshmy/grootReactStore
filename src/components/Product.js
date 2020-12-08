import React, { Component } from 'react';
import {API_KEY} from '../Config';
import {Link} from 'react-router-dom';

export default class Product extends Component {
    state={
        activeProduct:[]
    }
    componentDidMount= async()=>{
    const productAsin = this.props.location.state.product;
    console.log(productAsin);
    const req= await fetch(`https://amazon-product-reviews-keywords.p.rapidapi.com/product/details?asin=${productAsin}&country=US`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "amazon-product-reviews-keywords.p.rapidapi.com"
      }
    });
    const res= await req.json();
    console.log(res);
    console.log(res.product);
    this.setState({
            activeProduct:res.product
        });
    
}
    render() {
        //console.log(this.props);
        return (
            <div className='container'>
                {
                this.state.activeProduct.length !== 0 ? 
                    
                    <div className="active-product">
                        <img src={this.state.activeProduct.main_image} alt={this.state.activeProduct.title} className="active-product_img"/>
                        <h3 className="active-product_title">{this.state.activeProduct.title}</h3>
                        <h4 className="product_subtitle">{this.state.activeProduct.description}</h4>
                     </div>
                     :
                     <div className='active-product_title'>Loading Product....</div> 
    }
            <Link to='/' className="product_text">Go Home</Link>
            
                
            </div>
        )
    }
}
