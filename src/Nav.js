import {NavLink} from "react-router-dom";
import React, { Component } from 'react'


class Nav extends Component {

    render() {

        const { loggedIn, loadCreateForm, logout } = this.props;

        return (
                <ul className="nav nav-pills py-4">
                <li className="nav-item">
                    <NavLink exact={true} activeClassName="active" className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink exact={true} activeClassName="active" className="nav-link" onClick={loadCreateForm}
                             to="/createshoppinglist">Create New Shopping List</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink activeClassName="active" className="nav-link disabled" to="/update">Update Shopping
                        List</NavLink>
                </li>
                    {loggedIn ?
                    (<li className="nav-item">
                    <NavLink exact={true} activeClassName="active" className="nav-link" onClick={logout} to="/logout">Logout</NavLink>
                    </li>) :
                    <li className="nav-item">
                        <NavLink exact={true} activeClassName="active" className="nav-link" to="/login">Login</NavLink>
                    </li> }
                </ul>
                )
    }

}

export default Nav;


