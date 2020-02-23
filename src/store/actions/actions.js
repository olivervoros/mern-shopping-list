import axios from "axios";
import {
    API_ENDPOINT,
    getAuthTokenFromCookie,
    getUserIdFromCookie,
    getShoppingListItemsArray
} from "../../components/Helper";

export const login = (event) => async dispatch => {
    event.preventDefault();

    const household = document.getElementById("household").value;
    const password = document.getElementById("password").value;

    let payload = {household: household, password: password};

    try {
        let res = await axios.post(
            API_ENDPOINT+"/login", payload
        );
        // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded
        dispatch({ type: "LOGIN", res });
    } catch (error) {
        console.log(error);
        dispatch({ type: "LOGIN" });
    }

    try {
        let shoppingLists = await axios.get(
            API_ENDPOINT+"/shoppinglists/"+getUserIdFromCookie(), { headers: {"x-access-token" : getAuthTokenFromCookie()}}
        );
        // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded
        dispatch({ type: "GET_ALL_SHOPPING_LISTS", shoppingLists });
    } catch (error) {
        console.log(error);
    }

};

export const logout = (event) => {
    return { type: 'LOGOUT', event: event }
};

export const loadAllShoppingLists = () => async dispatch => {

    if(! getAuthTokenFromCookie()) {
        return;
    }


    try {
        let shoppingLists = await axios.get(
            API_ENDPOINT+"/shoppinglists/"+getUserIdFromCookie(), { headers: {"x-access-token" : getAuthTokenFromCookie()}}
        );
        // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded
        dispatch({ type: "GET_ALL_SHOPPING_LISTS", shoppingLists });
    } catch (error) {
        console.log(error);
    }
};

export const createNewShoppingList = (args = {}) => async dispatch => {

        let shoppingListItemsMap = new Map();

        let title = args.title;
        let author = args.author || "OV";
        let userId = getUserIdFromCookie();

        const productsArray = getShoppingListItemsArray();
        Object.keys(productsArray).map(key => {
            let itemValue = args[key.toString()] || "0";
            shoppingListItemsMap.set(key.toString(), itemValue);
        });

        let items = Object.fromEntries(shoppingListItemsMap);

        let payload = {title: title, author: author, userId: userId, items: items};

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

export const updateShoppingList = (args, shoppingListItem) => async dispatch => {

    let shoppingListItemsMap = new Map();

    let id = shoppingListItem._id;
    let title = args.title || shoppingListItem.title;
    let author = args.author || shoppingListItem.author;
    let userId = getUserIdFromCookie();

    const productsArray = getShoppingListItemsArray();
    Object.keys(productsArray).map(key => {

        let oldValue = shoppingListItem.items[key];
        let newValue = args[key];

        if(newValue) {
            shoppingListItemsMap.set(key.toString(), newValue);
        } else if(oldValue) {
            shoppingListItemsMap.set(key.toString(), oldValue);
        } else {
            shoppingListItemsMap.set(key.toString(), "0");
        }

    });

    let items = Object.fromEntries(shoppingListItemsMap);

    let payload = {title: title, author: author, userId: userId, items: items};

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
            API_ENDPOINT+"/shoppinglists/"+getUserIdFromCookie(), { headers: {"x-access-token" : getAuthTokenFromCookie()}}
        );
        // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded
        dispatch({ type: "UPDATE_SHOPPING_LIST", shoppingLists });
    } catch (error) {
        console.log(error);
    }
};

export const deleteShoppingList = (event) => async dispatch => {

    event.preventDefault();

    if(! window.confirm('Are you sure you want to delete the item?')) {
        return;
    }

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

};