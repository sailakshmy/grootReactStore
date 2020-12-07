import React, { Component } from 'react'

export default class FilterForm extends Component {
    render() {
        return (
            <div>
                <label htmlFor="">
                    Sort By 
                    <select className="form-control" value={this.props.sort} onChange={this.props.handleChangeSort}>
                        <option value="">Select</option>
                        <option value="lowest">Price:Lowest to Highest</option>
                        <option value="highest">Price:Highest to Lowest</option>
                    </select>
                    </label>     

            </div>
        )
    }
}
