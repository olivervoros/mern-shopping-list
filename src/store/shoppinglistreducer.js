import {convertUserDateToJS} from "../Helper";

const initialState = {
    loggedIn : false,
    loginErrorMsg : false,
    redirect : false,
    shoppingLists: [
        {id: 1, title: "Oliver's Shopping list 2019 08 10.", author: "Oliver", date: new Date("10 03 1980"), items : {'milk': 1, 'eggs': 2, 'water': 3, 'apples': 4}},
        {id: 2, title: "Aldi Shopping list 2019 06 22.", author: "Oliver", date: new Date("11 12 1950"), items : {'milk': 5, 'eggs': 6, 'water': 7, 'apples': 8}},
        {id: 3, title: "Gardening Shopping list.", author: "Oliver", date: new Date("07 10 1979"), items : {'milk': 9, 'eggs': 10, 'water': 11, 'apples': 12}},
        {id: 4, title: "Just added a new list item.", author: "Oliver", date: new Date("11 15 2016"), items : {'milk': 13, 'eggs': 14, 'water': 15, 'apples': 16}},
        {id: 5, title: "Another shopping list.", author: "Bryda", date: new Date("06 04 1956"), items : {'milk': 93, 'eggs': 94, 'water': 95, 'apples': 96}},

    ],
    fullShoppingList: []
};

// TODO: move from reducer...
function getShoppingListItemsFromForm() {
    const milk = document.getElementById("milk").value;
    const eggs = document.getElementById("eggs").value;
    const water = document.getElementById("water").value;
    const apples = document.getElementById("apples").value;

    return {'milk': milk, 'eggs': eggs, 'water': water, 'apples': apples}
}

const reducer = (state = initialState, action) => {
    const newState = {...state};

    if(action.type==='CREATE_SHOPPING_LIST_ITEM') {
        console.log('CREATE_SHOPPING_LIST_ITEM');
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
        console.log('UPDATE_SHOPPING_LIST');
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

    // TODO: pointless...
    if(action.type==='GET_SHOPPING_LIST_ITEM') {
        console.log("GET_SHOPPING_LIST_ITEM");
    }

    if(action.type==='DELETE_SHOPPING_LIST_ITEM') {
        console.log("DELETE_SHOPPING_LIST_ITEM");
        action.event.preventDefault();


        const id = parseInt(action.event.target.id);

        const filteredShoppingList = newState.shoppingLists.filter((value, index, arr) => {
            return parseInt(value.id) !== id;

        });

        newState.shoppingLists = filteredShoppingList;
    }

    if(action.type==='LOAD_CREATE_FORM') {
        console.log('LOAD_CREATE_FORM');
        newState.redirect = false;
    }

    if(action.type==='LOGIN') {
        console.log('LOGIN');
        action.event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        console.log(email);

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
        console.log('LOGOUT');
        action.event.preventDefault();

        newState.loggedIn = false;
        newState.redirect = false;
        newState.loginErrorMsg = false;
    }

    return newState;
}

export default reducer;