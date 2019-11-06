
const initialState = {
    loggedIn : true, // TODO: change back to false after testing...
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
            console.log("VALUE:");
            console.log(value._id);

            console.log("ACTION:");
            console.log(action.deletedShoppingList.data.deletedId);

            return value._id !== action.deletedShoppingList.data.deletedId;
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