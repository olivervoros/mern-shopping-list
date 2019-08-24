

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