import React, { Component } from 'react'
import ShoppingListItem from './ShoppingListItem'
import PropTypes from 'prop-types';
import Nav from "./Nav";
import {Redirect } from 'react-router-dom'

class ShoppingList extends Component {

    static propTypes = {
        shoppingLists: PropTypes.array,
        deleteShoppingListItem: PropTypes.func,
        loadCreateForm: PropTypes.func,
        loggedIn: PropTypes.bool,
        logout: PropTypes.bool
    }

    render() {
        const { shoppingLists, deleteShoppingListItem, loadCreateForm, loggedIn, logout } = this.props;

        if(!loggedIn) {
            return <Redirect to="/login"/>
        }

        const REACT_VERSION = React.version;

        return (
            <div>
                <Nav loadCreateForm={loadCreateForm} loggedIn={loggedIn} logout={logout}></Nav>
                <h3 className="py-3">REACTJS version:{REACT_VERSION} - Shopping List Manager</h3>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                {shoppingLists.map(
                    (shoppingList, i) =>
                        <ShoppingListItem
                            key={i}
                            title={shoppingList.title}
                            id={shoppingList.id}
                            deleteShoppingListItem={deleteShoppingListItem}
                            loadCreateForm={loadCreateForm}
                        />

                )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ShoppingList;