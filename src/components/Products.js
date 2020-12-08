import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchProducts } from '../actions/productActions';
//import { addToCart } from '../actions/cartActions';

class Products extends Component {
    UNSAFE_componentWillMount(){
        this.props.fetchProducts();
    }
    render(){
    return (
        <div className="container">
            {this.props.products && this.props.products.length > 0 ?
            <div className="row">
            { this.props.products.map((product)=>{
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
                    {}
                    <button className="product_button" onClick={(e)=>this.props.addToCart(e,product)}>Add to Cart</button>
                    

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
}
const mapStateToProps= (state)=>{
   // console.log(state);
    //console.log(state.products);
    //console.log(state.products.items);
    //console.log(state.products.items.products);
    return{
        products: state.products.items.products
    }
    
};
const mapDispatchToProps=(dispatch)=>{
    return{
    fetchProducts:()=>dispatch(fetchProducts()),
    //addToCart:(items,newItem)=>dispatch(addToCart(items, newItem))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Products);