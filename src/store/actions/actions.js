import axios from "axios";
import { getShoppingListItemsFromForm, API_ENDPOINT, getAuthTokenFromCookie } from "../../Helper";

export const login = (event) => async dispatch => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let payload = {email: email, password: password};

    try {
        let res = await axios.post(
            API_ENDPOINT+"/login", payload, { headers: {"x-access-token" : getAuthTokenFromCookie()}}
        );
        // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded
        dispatch({ type: "LOGIN", res });
    } catch (error) {
        console.log(error);
        dispatch({ type: "LOGIN" });
    }
}

export const logout = (event) => {
    return { type: 'LOGOUT', event: event }
}

export const loadAllShoppingLists = () => async dispatch => {

    try {
        let shoppingLists = await axios.get(
            API_ENDPOINT+"/shoppinglists", { headers: {"x-access-token" : getAuthTokenFromCookie()}}
        );
        // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded
        dispatch({ type: "GET_ALL_SHOPPING_LISTS", shoppingLists });
    } catch (error) {
        console.log(error);
    }
};

export const createNewShoppingList = (event) => async dispatch => {

    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const userDate = document.getElementById("date").value;
    const items = getShoppingListItemsFromForm();

    let payload = {title: title, author: author, date: userDate, items: items};

    try {
        let newShoppingListItem = await axios.post(
            API_ENDPOINT+"/shoppinglists", payload, { headers: {"x-access-token" : getAuthTokenFromCookie() }}
        );
        // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded
        dispatch({ type: "CREATE_SHOPPING_LIST_ITEM", newShoppingListItem });
    } catch (error) {
        console.log(error);
    }
};

export const updateShoppingList = (event) => async dispatch => {

    event.preventDefault();

    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const userDate = document.getElementById("date").value;
    const items = getShoppingListItemsFromForm();

    let payload = {title: title, author: author, date: userDate, items: items};

    try {
        await axios.put(
            API_ENDPOINT+"/shoppinglists/" + id, payload, { headers: {"x-access-token" : getAuthTokenFromCookie()}}
        );
        // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded
    } catch (error) {
        console.log(error);
    }

    try {
        let shoppingLists = await axios.get(
            API_ENDPOINT+"/shoppinglists", { headers: {"x-access-token" : getAuthTokenFromCookie()}}
        );
        // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded
        dispatch({ type: "UPDATE_SHOPPING_LIST", shoppingLists });
    } catch (error) {
        console.log(error);
    }
}

export const deleteShoppingList = (event) => async dispatch => {

    event.preventDefault();

    const id = event.target.id;
    try {
        let deletedShoppingList = await axios.delete(
            API_ENDPOINT+"/shoppinglists/"+id, { headers: {"x-access-token" : getAuthTokenFromCookie()}}
        );
        // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded
        dispatch({ type: "DELETE_SHOPPING_LIST_ITEM", deletedShoppingList });
    } catch (error) {
        console.log(error);
    }

}