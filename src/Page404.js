import React, { Component } from 'react'
import {NavLink} from "react-router-dom";

class Page404 extends Component {

    render() {
        return (
        <div className="container text-center mt-5">
            <h1>404 - Page Not Found!</h1>
            <NavLink exact={true} activeClassName="active" className="nav-link" to="/">Back to the homepage -> </NavLink>
        </div>
        )
    }
}

export default Page404;