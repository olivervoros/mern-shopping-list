import Cookie from "js-cookie";

export const API_ENDPOINT = 'http://localhost:2000/api';

// converts to mm dd yy TO dd/mm/yy
export function convertJSToUserDate(date) {
    let JSDate = new Date(date);
    return  JSDate.getDate() + "/" + (JSDate.getMonth()+1) + "/" + JSDate.getFullYear();
}

export function capitaliseString(string) {
    return  (string.charAt(0).toUpperCase() + string.slice(1));
}

export function getShoppingListItemsArray() {
    return ['milk', 'eggs', 'water', 'apples'];
}

export function getShoppingListItemsFromForm() {
    const milk = document.getElementById("milk").value;
    const eggs = document.getElementById("eggs").value;
    const water = document.getElementById("water").value;
    const apples = document.getElementById("apples").value;

    return {'milk': milk, 'eggs': eggs, 'water': water, 'apples': apples}
}

export function getAuthTokenFromCookie() {

    return Cookie.get("token") ? Cookie.get("token") : false;
}