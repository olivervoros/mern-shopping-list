import React, { Component } from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {capitaliseString, getShoppingListItemsArray} from "./Helper";

class ViewShoppingList extends Component {

    deleteByValue(array, val) {
        for(let f in array) {
            if(array.hasOwnProperty(f) && array[f] === val) {
                delete array[f];
            }
        }
    }

    render() {
        const { shoppingLists, loggedIn, shoppingListItemToUpdateID } = this.props;

        const shoppingListItem = shoppingLists.find(item => item._id === shoppingListItemToUpdateID);
        if(!shoppingListItem) {
            return <Redirect to="/404"/>
        }

        const items = (typeof shoppingListItem.items === 'undefined') ? false : shoppingListItem.items;

        this.deleteByValue(items, "0");

        if(!loggedIn) {
            return <Redirect to="/login"/>
        }

        const ProductsArray = getShoppingListItemsArray();
        const shoppingItems = Object.keys(items).map(key =>
            <div key={key}>
                <p>- {capitaliseString(ProductsArray[key])}: {items[key]}</p>
            </div>
        );

        return (
            <div className="container mt-5">
            <h3 className="mb-4">Shopping List: {shoppingListItem.title}</h3>
                { shoppingItems }
                <div>
                    <NavLink className="mb-4" exact={true} activeClassName="active" to="/">Back to the homepage -> </NavLink>
                </div>
            </div>

        )
    }
}

export default ViewShoppingList;