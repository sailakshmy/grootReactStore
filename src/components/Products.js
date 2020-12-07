import React from 'react';
import {Link} from 'react-router-dom';

export default function Products(props) {
    return (
        <div className="container">
            {props.products.length > 0 ?
            <div className="row">
            { props.products.map((product)=>{
            return(
              <div className="col-md-4" key={product.asin} style={{marginBottom:"2rem"}}> 
                <div className="product_box">
                    <img src={product.thumbnail} alt={product.title} className="product_box-img"/>
                    <div className="product_text">
                        <h5 className="product_title">{product.title.length < 20 ? `${product.title}`:`${product.title.substring(0,25)}...`}</h5>
                        <p className="product_subtitle">Price: <span>{product.price.currency} {product.price.current_price}</span></p>
                        <Link to={{
                                    pathname:`/product/${product.asin}`,
                                    state: {product: product.asin}
                                }}  
                            style={{margin:"0 0.2rem"}} className="product_text">View Details</Link>
                    </div>
                    
                    <button className="product_button" onClick={(e)=>props.handleAddToCart(e,product)}>Add to Cart</button>
                    

                </div>
              </div>
              );}
          )}        
            </div>    
            :
            <div className='product_title'>Loading products...</div>
        }
        </div>
    )
}
