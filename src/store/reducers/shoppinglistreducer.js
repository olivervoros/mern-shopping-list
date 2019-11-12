import Cookie from "js-cookie"
import { getAuthTokenFromCookie } from "../../Helper";

const initialState = {
    loggedIn : !!getAuthTokenFromCookie(),
    loginErrorMsg : false,
    redirect : false,
    shoppingLists: [],
    fullShoppingList: []
};

const reducer = (state = initialState, action) => {
    const newState = {...state};

    if(action.type==='GET_ALL_SHOPPING_LISTS') {

        newState.shoppingLists = action.shoppingLists.data;

    }

    if(action.type==='CREATE_SHOPPING_LIST_ITEM') {

        newState.shoppingLists = [...newState.shoppingLists, action.newShoppingListItem.data];
        newState.redirect = true;
    }

    if(action.type==='UPDATE_SHOPPING_LIST') {

        newState.shoppingLists = action.shoppingLists.data;
        newState.redirect = true;
    }


    if(action.type==='DELETE_SHOPPING_LIST_ITEM') {

        const filteredShoppingList = newState.shoppingLists.filter((value, index, arr) => {

            return value._id !== action.deletedShoppingList.data.deletedId;
        });

        newState.shoppingLists = filteredShoppingList;
    }

    if(action.type==='LOAD_CREATE_FORM') {
        newState.redirect = false;
    }

    if(action.type==='LOGIN') {
        console.log(action.res);
        if(action.res && action.res.data.auth===true) {

            Cookie.set("token", action.res.data.token);

            newState.loggedIn = true;
            newState.redirect = true;
            newState.loginErrorMsg = false;

        } else {

            newState.loggedIn = false;
            newState.redirect = false;
            newState.loginErrorMsg = true;
        }
    }

    if(action.type==='LOGOUT') {
        action.event.preventDefault();

        Cookie.set('token', "");

        newState.loggedIn = false;
        newState.redirect = false;
        newState.loginErrorMsg = false;
    }

    return newState;
}

export default reducer;