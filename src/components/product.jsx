import React, {Component } from 'react';
import axios from 'axios';
class Product extends Component {    
    constructor(props){
        super(props);
        this.state = {
            name : ''
            ,description:''
            ,price:0
            ,categoryId:0
            ,categories:[]
            ,ip:'192.168.0.25'
        }
        this.handleChange = this.handleChange.bind(this);
    
        this.SaveProduct = this.SaveProduct.bind(this);
    }


    giveProduct(product)
    {
        this.setState({
            name:product.Name
            ,description:product.Description
            ,price:product.Price
            ,categoryId:product.CategoryId
        });
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value});
    
    
    componentDidMount()
    {
        this.ListCategories();
    }
    componentDidUpdate()
    {
        if(this.props.onChange)
        {
            this.props.onChange(this.state);
        }
    }

    ListCategories(){
        axios.get('http://'+this.state.ip+'/APISysLogistic/API/Category/List')
        .then(response=>{            
            this.setState({ categories: response.data.lstCategories });
        });
    }
    
    ClearProduct()
    {
        this.setState({
            name:''
            ,description:''
            ,categoryId:0
            ,price:0
        });
    }
    SaveProduct()
    {
        axios.post('http://'+this.state.ip+'/APISysLogistic/API/Product/Create',null, {
           params:{
               'name':this.state.name,
               'description':this.state.description,
               'categoryId':this.state.categoryId,
               'price':this.state.price
           }
        }).then(response=>{
            var product = response.data;
            this.props.findByProduct(product);
        });
    }
    render(){
        
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <label>Name</label>
                            <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} className="form-control"/>
                        </div>
                        <div className="row">
                            <label>Description</label>
                            <input type="text" id="description" name="description" value= {this.state.description} onChange={this.handleChange} className="form-control"/>
                        </div>
                        <div className="row">
                            <label>Price</label>
                            <input type="text" id="price" name="price" value={this.state.price} onChange={this.handleChange}   className="form-control"/>
                        </div>
                        <div className="row">
                            <label>Category</label>
                            <select id="categoryId" name = "categoryId" value={this.state.categoryId} onChange={this.handleChange} className="form-control">
                                <option value="0">Selection...</option>
                                {
                                    this.state.categories &&
                                    this.state.categories.length > 0 && 
                                    this.state.categories.map(category => {
                                        return <option key={category.Id} value={category.Id}>{category.Name}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <button onClick={this.SaveProduct} className='btn btn-primary'>Save</button>
                        </div>
                    </div>    
                </div>
            </div>
        )
    }
}

export default Product;