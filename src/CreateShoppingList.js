import React, { Component } from 'react'
import PropTypes from "prop-types";
import Nav from "./Nav";
import {Redirect } from 'react-router-dom'
import {capitaliseString, getShoppingListItemsArray } from "./Helper";

class CreateShoppingList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: ''
        };
    }

    static propTypes = {
        createShoppingListItem: PropTypes.func.isRequired,
        loadCreateForm : PropTypes.func.isRequired,
        loggedIn: PropTypes.bool,
        logout: PropTypes.func
    };

    updateInputValue(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    submitForm(e, createShoppingListItem) {
        e.preventDefault();
        createShoppingListItem(this.state);
    }

    render() {
        const { createShoppingListItem, loadCreateForm, loggedIn, logout } = this.props;

        if(!loggedIn) {
            return <Redirect to="/login"/>
        }

        const ProductsArray = getShoppingListItemsArray();
        const products = Object.keys(ProductsArray).map(key => {
            return <div className="form-group" key={key}>
                <label className="mr-5" htmlFor={key}>{capitaliseString(ProductsArray[key])}:</label>
                <input key={key} id={key} name={key} type="text" onChange={e => this.updateInputValue(e)} />
            </div>
        });

        return(
            <div>
                <Nav loadCreateForm={loadCreateForm} loggedIn={loggedIn} logout={logout}></Nav>
            <h2 className="py-3">Create a new shopping list</h2>
            <form className="createShoppingListForm" action="#" method="post">
                <div className="form-group">
                    <label className="mr-5" htmlFor="title">Title:</label>
                    <input required id="title" name="title" type="text" onChange={e => this.updateInputValue(e)}/>
                </div>
                <div className="form-group">
                    <label className="mr-5" htmlFor="author">Author:</label>
                    <input required id="author" name="author" type="text" onChange={e => this.updateInputValue(e)}/>
                </div>
                { products }
                <p><button onClick={(e) => this.submitForm(e, createShoppingListItem)} className="btn btn-info">Create Shopping List</button></p>
            </form>
            </div>
        )
    }
}

export default CreateShoppingList;