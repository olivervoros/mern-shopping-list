import React, { Component } from "react";
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";

class ShoppingListItem extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        deleteShoppingListItem: PropTypes.func.isRequired,
        loadCreateForm: PropTypes.func.isRequired
    }


    render() {
        const {title, _id, deleteShoppingListItem, loadCreateForm} = this.props;

        return (
                    <tr>
                        <th scope="row">{title}</th>
                        <td><Link onClick={loadCreateForm} to={`/update/${_id}`}>Update the shopping list</Link></td>
                        <td><Link onClick={deleteShoppingListItem} id={_id} to="#">Delete Shopping List</Link></td>
                    </tr>
        )
    }
}

export default ShoppingListItem;