

// converts dd/mm/yy TO mm dd yy
export function convertUserDateToJS(userDate) {
    const userDateArray = userDate.split("/");
    return userDateArray[1] + " " + userDateArray[0] + " " + userDateArray[2];
}

// converts to mm dd yy TO dd/mm/yy
export function convertJSToUserDate(date) {
    return  date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
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

export function getDefaultShoppingListData() {
    return [
        {id: 1, title: "Oliver's Shopping list 2019 08 10.", author: "Oliver", date: new Date("10 03 1980"), items : {'milk': 1, 'eggs': 2, 'water': 3, 'apples': 4}},
        {id: 2, title: "Aldi Shopping list 2019 06 22.", author: "Oliver", date: new Date("11 12 1950"), items : {'milk': 5, 'eggs': 6, 'water': 7, 'apples': 8}},
        {id: 3, title: "Gardening Shopping list.", author: "Oliver", date: new Date("07 10 1979"), items : {'milk': 9, 'eggs': 10, 'water': 11, 'apples': 12}},
        {id: 4, title: "Just added a new list item.", author: "Oliver", date: new Date("11 15 2016"), items : {'milk': 13, 'eggs': 14, 'water': 15, 'apples': 16}},
        {id: 5, title: "Another shopping list.", author: "Bryda", date: new Date("06 04 1956"), items : {'milk': 93, 'eggs': 94, 'water': 95, 'apples': 96}},

    ];
}