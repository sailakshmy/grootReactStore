import React from 'react'

export default function SearchForm(props) {
    return (
        <div>
            <form onSubmit={props.onClickSearchProduct} style={{marginBottom:"2rem"}}>
                <input className="form_input" type="text" placeholder="Search for products" name="productName"/>
                <button className="form__button">Search</button>
            </form>
        </div>
    )
}
