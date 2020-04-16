import React, { Component } from 'react';
import Product from './product'
class Products extends Component {
    state = {
        products:[]
    }

    ListProducts()
    {
        fetch('http://192.168.0.21/APISysLogistic/API/Product/List')
        .then((response)=>{
            return response.json()
        })
        .then((products)=>{
            this.setState({ products: products })
        })
        .catch(console.log)
    }
    renderTableData()
    {
        return this.state.products.map((product,index) => {
            const { id ,name, price } = product
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{price}</td>
                </tr>
            )
        })  
    }
    render(){
        this.ListProducts();
        return(
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <h1 id="title">React Dynamic Table</h1>
                        <table id="products" className="table" >
                            <tbody>
                                {this.renderTableData()}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6">
                        <Product />
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Products