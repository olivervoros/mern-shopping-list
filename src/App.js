import React, {Component} from 'react';
import {Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import ShoppingList from './ShoppingList';
import UpdateShoppingList from './UpdateShoppingList';
import CreateShoppingList from './CreateShoppingList';
import LoginForm from './LoginForm';
import Page404 from './Page404';
import {connect} from 'react-redux';
import {getShoppingListItemsArray} from "./Helper";

class App extends Component {

    render() {

        const shoppinglistitems = getShoppingListItemsArray();

        return (
            <Router>
                <div className="container">
                    <div>
                        <Switch>
                            <Route exact path="/"
                                   render={() =>
                                       <ShoppingList
                                           shoppinglists={this.props.shoppingLists}
                                           deleteShoppingListItem={this.props.deleteShoppingListItem}
                                           viewShoppingListItem={this.props.viewShoppingListItem}
                                           loadCreateForm={this.props.loadCreateForm}
                                           loggedIn={this.props.loggedIn}
                                           logout={this.props.logout}/>}
                            />

                            <Route exact path="/update/:id"
                                   render={(props) => (this.props.redirect ?
                                       (<Redirect to={"/"}/>) :
                                       <UpdateShoppingList
                                           shoppingListItemToUpdateID={props.match.params.id}
                                           shoppinglists={this.props.shoppingLists}
                                           updateShoppingList={this.props.updateShoppingList}
                                           shoppinglistitems={shoppinglistitems}
                                           loadCreateForm={this.props.loadCreateForm}
                                           loggedIn={this.props.loggedIn}
                                           logout={this.props.logout}/>)}
                            />

                            <Route exact path="/createshoppinglist"
                                   render={() => (this.props.redirect ?
                                       (<Redirect to={"/"}/>) :
                                       <CreateShoppingList
                                           shoppinglists={this.props.shoppingLists}
                                           shoppinglistitems={shoppinglistitems}
                                           createShoppingListItem={this.props.createShoppingListItem}
                                           loadCreateForm={this.props.loadCreateForm}
                                           loggedIn={this.props.loggedIn}
                                           logout={this.logout}/>)}
                            />
                            <Route exact path="/login"
                                   render={() => (this.props.redirect ?
                                           (<Redirect to={"/"}/>) :
                                           <LoginForm
                                               login={this.props.login}
                                               loadCreateForm={this.props.loadCreateForm}
                                               loggedIn={this.props.loggedIn}
                                               loginErrorMsg={this.props.loginErrorMsg}/>
                                   )}
                            />
                            <Route component={Page404}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn : state.loggedIn,
        loginErrorMsg : state.loginErrorMsg,
        shoppingLists: state.shoppingLists,
        fullShoppingList: state.fullShoppingList,
        redirect : state.redirect
    }
}
const mapDispatchToProps =  (dispatch) => {
    return {
        createShoppingListItem: (event) => dispatch({type: 'CREATE_SHOPPING_LIST_ITEM', event: event}),
        updateShoppingList: (event) => dispatch({type: 'UPDATE_SHOPPING_LIST', event: event}),
        deleteShoppingListItem: (event) => dispatch({type: 'DELETE_SHOPPING_LIST_ITEM', event: event}),
        loadCreateForm: () => dispatch({type: 'LOAD_CREATE_FORM'}),
        login: (event) => dispatch({type: 'LOGIN', event: event}),
        logout: (event) => dispatch({type: 'LOGOUT', event: event}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);