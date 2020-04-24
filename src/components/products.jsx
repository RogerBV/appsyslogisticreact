import React, { Component } from 'react';
import axios from 'axios';
import Product from './product';
import { createRef } from 'react';
class Products extends Component {
    constructor(props)
    {
        super(props);   
        this.state = {
            products:[],
            ip:'192.168.0.25'
            ,product:''
        }
        this.findByProduct = this.findByProduct.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.productElement = createRef();
    }
    
    findByProduct(product)
    {
        var list = this.state.products;
        list.push(product);
        this.setState({ products:list });
    }
    handleClick = objproduct =>
    {
        this.productElement.current.giveProduct(objproduct);
    }
    componentDidMount ()
    {
        this.ListProducts();
    }
    ListProducts()
    {
        axios.get('http://'+this.state.ip+'/APISysLogistic/API/Product/List')
        .then(response=>{
            this.setState({ products:response.data.lstRegisteredProducts })       
        },(error)=>{
            console.log(error);
        });
    }
    
    render(){        
        return(
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <h1 id="title">React Dynamic Table</h1>
                        <table id="products" className="table" >
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products && 
                                    this.state.products.length > 0 && 
                                    this.state.products.map(product => {
                                        return <tr key={product.Id} onClick={()=>this.handleClick(product)} ><td>{product.Id}</td><td>{product.Name}</td><td>{product.Description}</td><td>{product.Price}</td><td>{product.CategoryName}</td></tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6">
                       <Product ref={this.productElement} onChange={this.onClick} findByProduct={this.findByProduct} />
                    </div>                    
                </div>
            </div>
        )
    }
}

export default Products