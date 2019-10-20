import React, { Component } from 'react'
import PropTypes from "prop-types";
import { capitaliseString, convertJSToUserDate } from "./Helper";
import Nav from "./Nav";
import { Redirect } from 'react-router-dom'

class UpdateShoppingList extends Component {


    static propTypes = {
        updateShoppingList: PropTypes.func.isRequired,
        loadCreateForm : PropTypes.func.isRequired,
        shoppingLists : PropTypes.array,
        loggedIn: PropTypes.bool,
        logout: PropTypes.func,
        shoppingListItemToUpdateID: PropTypes.number
    }

    render() {
        const { shoppingLists, updateShoppingList, loadCreateForm, loggedIn, logout, shoppingListItemToUpdateID } = this.props;

        const shoppingListItem = shoppingLists.find(item => parseInt(item.id) === parseInt(shoppingListItemToUpdateID));

        if(!shoppingListItem) {
            return <Redirect to="/404"/>
        }

        const items = (typeof shoppingListItem.items === 'undefined') ? false : shoppingListItem.items;


        if(!loggedIn) {
            return <Redirect to="/login"/>
        }

        const shoppingItems = Object.keys(items).map(key =>
            <div className="form-group" key={key}><label className="mr-5" htmlFor="{key}">{capitaliseString(key)}:</label> <input key={key} id={key} name={key} defaultValue={items[key]} type="text"/></div>
        )
        return (
            <div>
                <Nav loadCreateForm={loadCreateForm} loggedIn={loggedIn} logout={logout}></Nav>
            <h2 className="py-3">Update the shopping list</h2>
            <form className="updateShoppingListForm" action="#" method="post" onSubmit={ updateShoppingList }>
                <input id="id" name="id" readOnly  value={shoppingListItem.id} type="hidden"/>
                <div className="form-group">
                    <label className="mr-5" htmlFor="title">Title:</label>
                    <input required id="title" name="title" defaultValue={shoppingListItem.title} type="text"/>
                </div>
                <div className="form-group">
                    <label className="mr-5" htmlFor="author">Author:</label>
                    <input required id="author" name="author" defaultValue={shoppingListItem.author} type="text"/>
                </div>
                <div className="form-group">
                    <label className="mr-5" htmlFor="date">Date: DD/MM/YYYY (not editable)</label>
                    <input required id="date"name="date" defaultValue={convertJSToUserDate(shoppingListItem.date)} readOnly type="text"/>
                </div>
                { shoppingItems }
                <p><button className="btn btn-success">Update Shopping List</button></p>
            </form>
        </div>
        )
    }
}

export default UpdateShoppingList;