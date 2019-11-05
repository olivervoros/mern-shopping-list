import {convertUserDateToJS, getShoppingListItemsFromForm, getDefaultShoppingListData} from "../../Helper";

const initialState = {
    loggedIn : false,
    loginErrorMsg : false,
    redirect : false,
    shoppingLists: getDefaultShoppingListData(),
    fullShoppingList: []
};

const reducer = (state = initialState, action) => {
    const newState = {...state};

    if(action.type==='CREATE_SHOPPING_LIST_ITEM') {
        action.event.preventDefault();

        let maxId = 0;
        newState.shoppingLists.forEach(item => {
            if (item.id > maxId) {
                maxId = item.id;
            }
        });
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const userDate = document.getElementById("date").value;
        const formattedUserDate = convertUserDateToJS(userDate);
        const date = new Date(formattedUserDate);
        const items = getShoppingListItemsFromForm();

        newState.shoppingLists = [...newState.shoppingLists, {id: ++maxId, title: title, author: author, date: date, items: items}];
        newState.redirect = true;
    }

    if(action.type==='UPDATE_SHOPPING_LIST') {
        action.event.preventDefault();

        const id = parseInt(document.getElementById("id").value);
        const objIndex = newState.shoppingLists.findIndex((obj => parseInt(obj.id) === id));
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const userDate = document.getElementById("date").value;
        const formattedUserDate = convertUserDateToJS(userDate);
        const date = new Date(formattedUserDate);

        const items = getShoppingListItemsFromForm();

        const cloneShoppingLists = [...newState.shoppingLists];

        cloneShoppingLists[objIndex] = {id: id, title: title, author: author, date: date, items: items};

        newState.shoppingLists = cloneShoppingLists;
        newState.redirect = true;
    }


    if(action.type==='DELETE_SHOPPING_LIST_ITEM') {
        action.event.preventDefault();


        const id = parseInt(action.event.target.id);

        const filteredShoppingList = newState.shoppingLists.filter((value, index, arr) => {
            return parseInt(value.id) !== id;

        });

        newState.shoppingLists = filteredShoppingList;
    }

    if(action.type==='LOAD_CREATE_FORM') {
        newState.redirect = false;
    }

    if(action.type==='LOGIN') {
        action.event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if(email==='user@example.com' && password==='password') {

            newState.loggedIn = true;
            newState.redirect = true;

        } else {

            newState.loggedIn = false;
            newState.redirect = false;
            newState.loginErrorMsg = true;

        }
    }

    if(action.type==='LOGOUT') {
        action.event.preventDefault();

        newState.loggedIn = false;
        newState.redirect = false;
        newState.loginErrorMsg = false;
    }

    return newState;
}

export default reducer;