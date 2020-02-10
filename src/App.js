import React, {Component} from 'react';
import {Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import ShoppingList from './ShoppingList';
import UpdateShoppingList from './UpdateShoppingList';
import CreateShoppingList from './CreateShoppingList';
import ViewShoppingList from './ViewShoppingList';
import LoginForm from './LoginForm';
import Page404 from './Page404';
import {connect} from 'react-redux';
import * as ActionCreator from './store/actions/actions';
import {getShoppingListItemsArray} from "./Helper";

class App extends Component {

    componentDidMount() {
        this.props.getAllShoppingListItems();
    }

    render() {

        const shoppingListItems = getShoppingListItemsArray();

        return (
            <Router>
                <div className="container">
                    <div>
                        <Switch>
                            <Route exact path="/"
                                   render={() =>
                                       <ShoppingList
                                           shoppingLists={this.props.shoppingLists}
                                           deleteShoppingListItem={this.props.deleteShoppingListItem}
                                           loadCreateForm={this.props.loadCreateForm}
                                           loggedIn={this.props.loggedIn}
                                           logout={this.props.logout}/>}
                            />

                            <Route exact path="/update/:id"
                                   render={(props) => (this.props.redirect ?
                                       (<Redirect to={"/"}/>) :
                                       <UpdateShoppingList
                                           shoppingListItemToUpdateID={props.match.params.id}
                                           shoppingLists={this.props.shoppingLists}
                                           updateShoppingList={this.props.updateShoppingList}
                                           loadCreateForm={this.props.loadCreateForm}
                                           loggedIn={this.props.loggedIn}
                                           logout={this.props.logout}/>)}
                            />

                            <Route exact path="/createshoppinglist"
                                   render={() => (this.props.redirect ?
                                       (<Redirect to={"/"}/>) :
                                       <CreateShoppingList
                                           shoppingLists={this.props.shoppingLists}
                                           shoppingListItems={shoppingListItems}
                                           createShoppingListItem={this.props.createShoppingListItem}
                                           loadCreateForm={this.props.loadCreateForm}
                                           loggedIn={this.props.loggedIn}
                                           logout={this.logout}/>)}
                            />
                            <Route exact path="/viewshoppinglist/:id"
                                   render={(props) => (this.props.redirect ?
                                       (<Redirect to={"/"}/>) :
                                       <ViewShoppingList
                                           shoppingListItemToUpdateID={props.match.params.id}
                                           shoppingLists={this.props.shoppingLists}
                                           loggedIn={this.props.loggedIn}
                                           logout={this.logout}/>)}
                            />
                            <Route exact path="/login"
                                   render={() => ((this.props.redirect) ?
                                           (<Redirect to={"/"}/>) :
                                           <LoginForm
                                               login={this.props.login}
                                               loginErrorMsg={this.props.loginErrorMsg}
                                               loggedIn={this.props.loggedIn}
                                                />
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
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAllShoppingListItems: () => dispatch(ActionCreator.loadAllShoppingLists()),
        createShoppingListItem: (args) => dispatch(ActionCreator.createNewShoppingList(args)),
        updateShoppingList: (args, shoppingListItem) => dispatch(ActionCreator.updateShoppingList(args, shoppingListItem)),
        deleteShoppingListItem: (event) => dispatch(ActionCreator.deleteShoppingList(event)),
        loadCreateForm: () => dispatch({type: 'LOAD_CREATE_FORM'}),
        login: (event) => dispatch(ActionCreator.login(event)),
        logout: (event) => dispatch(ActionCreator.logout(event)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);