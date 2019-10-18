import React, { Component } from 'react'
import ShoppingListItem from './ShoppingListItem'
import PropTypes from 'prop-types';
import Nav from "./Nav";
import {Redirect } from 'react-router-dom'

class ShoppingList extends Component {

    static propTypes = {
        shoppinglists: PropTypes.array,
        deleteShoppingListItem: PropTypes.func,
        loadCreateForm: PropTypes.func
    }

    render() {
        const { shoppinglists, deleteShoppingListItem, loadCreateForm, loggedIn, logout } = this.props;

        // TODO: uncomment!
        //if(!loggedIn) {
         //   return <Redirect to="/login"/>
        //}

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
                {shoppinglists.map(
                    (shoppinglist, i) =>
                        <ShoppingListItem
                            key={i}
                            title={shoppinglist.title}
                            id={shoppinglist.id}
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