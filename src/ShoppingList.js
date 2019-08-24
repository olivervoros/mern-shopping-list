import React, { Component } from 'react'
import ShoppingListItem from './ShoppingListItem'
import PropTypes from 'prop-types';
import Nav from "./Nav";

class ShoppingList extends Component {

    static propTypes = {
        shoppinglists: PropTypes.array,
        deleteShoppingListItem: PropTypes.func,
        loadCreateForm: PropTypes.func
    }

    render() {
        const { shoppinglists, deleteShoppingListItem, loadCreateForm } = this.props;
        return (
            <div>
                <Nav loadCreateForm={loadCreateForm}></Nav>
                <h3 className="py-3">REACTJS - Shopping List Manager</h3>
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