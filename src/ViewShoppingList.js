import React, { Component } from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {capitaliseString, getAuthTokenFromCookie, getShoppingListItemsArray, deleteByValue} from "./Helper";
import Nav from "./Nav";

class ViewShoppingList extends Component {


    render() {
        const { shoppingLists, loadCreateForm, loggedIn, logout, shoppingListItemToUpdateID } = this.props;

        if(!loggedIn || !getAuthTokenFromCookie()) {
            return <Redirect to="/login"/>
        }

        const shoppingListItem = shoppingLists.find(item => item._id === shoppingListItemToUpdateID);
        if(!shoppingListItem) {
            return <Redirect to="/404"/>
        }

        const items = (typeof shoppingListItem.items === 'undefined') ? false : shoppingListItem.items;

        deleteByValue(items, "0");

        const ProductsArray = getShoppingListItemsArray();
        const shoppingItems = Object.keys(items).map(key =>
            <div key={key}>
                <p>{capitaliseString(ProductsArray[key])}: {items[key]}</p>
            </div>
        );

        return (
            <div>
                <Nav loadCreateForm={loadCreateForm} loggedIn={loggedIn} logout={logout}></Nav>
            <h3 className="mb-4">Shopping List: {shoppingListItem.title}</h3>
                { shoppingItems }
                <div>
                    <NavLink className="mb-4" exact={true} activeClassName="active" to="/">
                        <p><button className="btn btn-info">Back to the Homepage</button></p>
                    </NavLink>
                </div>
            </div>

        )
    }
}

export default ViewShoppingList;