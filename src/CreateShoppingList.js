import React, { Component } from 'react'
import PropTypes from "prop-types";
import { capitaliseString } from "./Helper";
import Nav from "./Nav";
import {Redirect } from 'react-router-dom'

class CreateShoppingList extends Component {

    static propTypes = {
        createShoppingListItem: PropTypes.func.isRequired,
        shoppingListItems: PropTypes.array.isRequired,
        loadCreateForm : PropTypes.func.isRequired,
        loggedIn: PropTypes.bool,
        logout: PropTypes.bool
    }

    render() {
        const { createShoppingListItem, loadCreateForm, loggedIn, logout, shoppingListItems } = this.props;

        if(!loggedIn) {
            return <Redirect to="/login"/>
        }

        const shoppingItems = Object.keys(shoppingListItems).map(key =>
            <div key={key} className="form-group"><label className="mr-5">{capitaliseString(shoppingListItems[key])}: </label><input required key={key} id={shoppingListItems[key]} name={shoppingListItems[key]} defaultValue=""  min="0" step="1" type="number"/></div>
        )
        return(
            <div>
                <Nav loadCreateForm={loadCreateForm} loggedIn={loggedIn} logout={logout}></Nav>
            <h2 className="py-3">Create a new shopping list</h2>
            <form className="createShoppingListForm" action="#" method="post" onSubmit={createShoppingListItem}>
                <div className="form-group">
                    <label className="mr-5" htmlFor="title">Title:</label>
                    <input required id="title" name="title" type="text" defaultValue=""/>
                </div>
                <div className="form-group">
                    <label className="mr-5" htmlFor="author">Author:</label>
                    <input required id="author" name="author" type="text" defaultValue=""/>
                </div>
                <div className="form-group">
                    <label className="mr-5" htmlFor="date">Date: (dd/mm/yyyy)</label>
                    <input required pattern="\d{1,2}/\d{1,2}/\d{4}" id="date" name="date" type="text" defaultValue=""/>
                </div>
                { shoppingItems }
                <p><button className="btn btn-info">Create Shopping List</button></p>
            </form>
            </div>
        )
    }
}

export default CreateShoppingList;