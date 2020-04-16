import React, {Component } from 'react';
class Product extends Component {    
    constructor(props){
        super(props);
        this.state = {
            name : ''
            ,description:''
            ,price:0
            ,categoryId:0
            ,categories:[]
            ,ip:'192.168.1.61'
        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.SaveProduct = this.SaveProduct.bind(this);
    }
    handleChangeName(event){
        this.setState({ name:event.target.value });
    }
    handleChangeDescription(event){
        this.setState({ description: event.target.value })
    }
    handleChangePrice(event){
        this.setState({ price: event.target.value });
    }
    handleChangeCategory(event){
        this.setState({ categoryId:event.target.value });
    }
    ListCategories(){
        fetch('http://192.168.1.61/APISysLogistic/API/Category/List')
        .then((response)=>{
            return response.json()
        })
        .then((categories)=>{
            this.setState({ categories: categories })
        })
        .catch(console.log)
    }
    SaveProduct()
    {
        fetch('http://192.168.0.21/APISysLogistic/API/Product/Create?Name='+this.state.name+'&Price='+this.state.price+"&Description="+this.state.description+"&CategoryId="+this.state.categoryId)
    }
    render(){
        this.ListCategories();
        return (
            <div>
                <div className="row">
                    <label>Name</label>
                    <input type="text" id="txtName" name="txtName" value={this.state.name} onChange={this.handleChangeName} className="form-control"/>
                </div>
                <div className="row">
                    <label>Description</label>
                    <input type="text" id="txtDescription" name="txtDescription" onChange={this.handleChangeDescription} className="form-control"/>
                </div>
                <div className="row">
                    <label>Price</label>
                    <input type="text" id="txtPrice" name="txtPrice" value={this.state.price} onChange={this.handleChangePrice}   className="form-control"/>
                </div>
                <div className="row">
                    <label>Category</label>
                    <select id="cboCategory" onChange={this.handleChangeCategory} className="form-control">
                    {this.state.categories.map((category) => <option key={category.Id} value={category.Id}>{category.Name}</option>)}
                    </select>
                </div>
                <div>
                    <button onClick={this.SaveProduct} className='btn btn-primary'>Registrar</button>
                </div>
            </div>
        )
    }
}

export default Product;