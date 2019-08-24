import React, {Component} from 'react'
import {render} from 'react-dom'
import {Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import ShoppingList from './ShoppingList';
import UpdateShoppingList from './UpdateShoppingList';
import CreateShoppingList from './CreateShoppingList';
import Page404 from './Page404';
import {convertUserDateToJS} from "./Helper";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shoppingLists: [
                {id: 1, title: "Oliver's Shopping list 2019 08 10.", author: "Oliver", date: new Date("10 03 1980"), items : {'milk': 1, 'eggs': 2, 'water': 3, 'apples': 4}},
                {id: 2, title: "Aldi Shopping list 2019 06 22.", author: "Oliver", date: new Date("11 12 1950"), items : {'milk': 5, 'eggs': 6, 'water': 7, 'apples': 8}},
                {id: 3, title: "Gardening Shopping list.", author: "Oliver", date: new Date("07 10 1979"), items : {'milk': 9, 'eggs': 10, 'water': 11, 'apples': 12}},
                {id: 4, title: "Just added a new list item.", author: "Oliver", date: new Date("11 15 2016"), items : {'milk': 13, 'eggs': 14, 'water': 15, 'apples': 16}},
                {id: 5, title: "Another shopping list.", author: "Bryda", date: new Date("06 04 1956"), items : {'milk': 93, 'eggs': 94, 'water': 95, 'apples': 96}},

            ],
            fullShoppingList: [],
        };

    }

    createShoppingListItem = (event) => {

        event.preventDefault();

        const id = this.state.shoppingLists.length + 1;
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const userDate = document.getElementById("date").value;
        const formattedUserDate = convertUserDateToJS(userDate);
        const date = new Date(formattedUserDate);
        const items = this.getShoppingListItemsFromForm();

        this.setState({
            shoppingLists: [...this.state.shoppingLists, {id: id, title: title, author: author, date: date, items: items}]
        });

        this.setState((state) => {
            state.redirect = true;
        });

    }

    updateShoppingList = (event) => {
        event.preventDefault();

        const id = parseInt(document.getElementById("id").value);
        const objIndex = this.state.shoppingLists.findIndex((obj => parseInt(obj.id) === id));
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const userDate = document.getElementById("date").value;
        const formattedUserDate = convertUserDateToJS(userDate);
        const date = new Date(formattedUserDate);

        const items = this.getShoppingListItemsFromForm();

        this.setState((state) => {
            state.shoppingLists[objIndex] = {id: id, title: title, author: author, date: date, items: items};

        });

        this.setState({
            redirect: true
        });

        return false;

    }

    getShoppingListItem = (id) => {

        const result = this.state.shoppingLists.find(item => parseInt(item.id) === parseInt(id));
        console.log("RESULT:"+result);
        if (!result) {
            console.log("A");
            return {title: "404 - List does not exists!"};
        } else {
            console.log("B");
            return result;
        }

    }

    deleteShoppingListItem = (event) => {

        event.preventDefault();


        const id = parseInt(event.target.id);

        const filteredShoppingList = this.state.shoppingLists.filter((value, index, arr) => {
            return parseInt(value.id) !== id;

        });

        this.setState({shoppingLists: filteredShoppingList});

        return false;
    }

    loadCreateForm = (event) => {
        this.setState((state) => {
            state.redirect = false;
        });
    }

    getShoppingListItemsFromForm = () => {
        const milk = document.getElementById("milk").value;
        const eggs = document.getElementById("eggs").value;
        const water = document.getElementById("water").value;
        const apples = document.getElementById("apples").value;

        return {'milk': milk, 'eggs': eggs, 'water': water, 'apples': apples}
    }

    getShoppingListItemsArray = () => {
        return ['milk', 'eggs', 'water', 'apples'];
    }

    render() {

        const shoppinglistitems = this.getShoppingListItemsArray();

        return (
            <Router>
                <div className="container">
                    <div>
                        <Switch>
                        <Route exact path="/"
                               render={(props) => <ShoppingList
                                                    shoppinglists={this.state.shoppingLists}
                                                    deleteShoppingListItem={this.deleteShoppingListItem}
                                                    viewShoppingListItem={this.viewShoppingListItem}
                                                    loadCreateForm={this.loadCreateForm}/>}
                        />

                        <Route exact path="/update/:id"
                               render={(props) =>  ( this.state.redirect ?
                                                   (<Redirect to={"/"} />) :
                                                    <UpdateShoppingList
                                                    shoppingListItem={this.getShoppingListItem(props.match.params.id)}
                                                    updateShoppingList={this.updateShoppingList}
                                                    shoppinglistitems={shoppinglistitems}
                                                    loadCreateForm={this.loadCreateForm}/>
                                                    )}
                        />

                        <Route exact path="/createshoppinglist"
                               render={(props) => ( this.state.redirect ?
                                                  (<Redirect to={"/"} />) :
                                                   <CreateShoppingList
                                                       shoppinglists={this.state.shoppingLists}
                                                       shoppinglistitems={shoppinglistitems}
                                                       createShoppingListItem={this.createShoppingListItem}
                                                       loadCreateForm={this.loadCreateForm}/>
                                                      )}
                        />
                            <Route component={Page404} />
                        </Switch>
                    </div>
                </div>
            </Router>

        )
    }
}


render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
