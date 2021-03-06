import React, { Component } from 'react'
import PropTypes from "prop-types";
import {NavLink, Redirect} from 'react-router-dom';
import {capitaliseString, getAuthTokenFromCookie, getShoppingListItemsArray} from "./Helper";

class UpdateShoppingList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: ''
        };
    }

    static propTypes = {
        updateShoppingList: PropTypes.func.isRequired,
        shoppingLists : PropTypes.array,
        loggedIn: PropTypes.bool,
        shoppingListItemToUpdateID: PropTypes.string
    };

    updateInputValue(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    submitForm(e, updateShoppingList, shoppingListItem) {
        e.preventDefault();
        updateShoppingList(this.state, shoppingListItem);
    }

    render() {
        const { shoppingLists, updateShoppingList, loggedIn, shoppingListItemToUpdateID } = this.props;

        if(!loggedIn || !getAuthTokenFromCookie()) {
            return <Redirect to="/login"/>
        }

        const shoppingListItem = shoppingLists.find(item => item._id === shoppingListItemToUpdateID);

        if(!shoppingListItem) {
            return <Redirect to="/404"/>
        }

        const items = (typeof shoppingListItem.items === 'undefined') ? false : shoppingListItem.items;

        const ProductsArray = getShoppingListItemsArray();
        const shoppingItems = Object.keys(ProductsArray).map(key =>
            <div className="form-group" key={key}>
                <label className="mr-5" htmlFor={key}>{capitaliseString(ProductsArray[key])}:</label>
                <input key={key} id={key} name={key} defaultValue={items[key] ? items[key] : "0"}  onChange={e => this.updateInputValue(e)} type="text"/>
            </div>
        );
        return (
            <div>
            <h2 className="py-3">Update the shopping list</h2>
                <NavLink className="mb-4" exact={true} activeClassName="active" to="/">
                    <p><button className="btn btn-info">Back to the Homepage</button></p>
                </NavLink>
            <form className="updateShoppingListForm" action="#" method="post">
                <input id="id" name="id" readOnly type="hidden"/>
                <div className="form-group">
                    <label className="mr-5" htmlFor="title">Title:</label>
                    <input required id="title" name="title" defaultValue={shoppingListItem.title} onChange={e => this.updateInputValue(e)} type="text"/>
                </div>
                <div className="form-group">
                    <label className="mr-5" htmlFor="author">Author:</label>
                    <input required id="author" name="author" defaultValue={shoppingListItem.author} onChange={e => this.updateInputValue(e)} type="text"/>
                </div>
                { shoppingItems }
                <p><button className="btn btn-success" onClick={(e) => this.submitForm(e, updateShoppingList, shoppingListItem)}>Update Shopping List</button></p>
            </form>
                <NavLink className="mb-4" exact={true} activeClassName="active" to="/">
                    <p><button className="btn btn-info">Back to the Homepage</button></p>
                </NavLink>
        </div>
        )
    }
}

export default UpdateShoppingList;