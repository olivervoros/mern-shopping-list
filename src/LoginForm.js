import React, { Component } from 'react'

class LoginForm extends Component {

    render() {

        const { login, loginErrorMsg } = this.props;

        return (

            <div className="container mt-5">
                {loginErrorMsg ? <div className="alert alert-warning"><strong>Warning!</strong> Invalid email address or password.</div> : "" }
                <h2 className="py-3">Login</h2>
                <form className="loginForm" action="#" method="post" onSubmit={login}>
                    <div className="form-group">
                        <label className="mr-5" htmlFor="email">Email:</label>
                        <input required id="email" name="email" type="email" defaultValue=""/>
                    </div>
                    <div className="form-group">
                        <label className="mr-5" htmlFor="password">Password:</label>
                        <input required id="password" name="password" type="password" defaultValue=""/>
                    </div>
                    <p><button className="btn btn-info">Login</button></p>
                </form>
            </div>
        )
    }



}

export default LoginForm;