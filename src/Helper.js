import Cookie from "js-cookie";

// export const API_ENDPOINT = 'http://localhost:2000/api'; // dev
export const API_ENDPOINT = 'http://api.sancusprojects.com:3000/api'; // prod

export function capitaliseString(string) {
    return  (string.charAt(0).toUpperCase() + string.slice(1));
}

export function getAuthTokenFromCookie() {

    return Cookie.get("token") ? Cookie.get("token") : false;
}

export function getUserIdFromCookie() {

    return Cookie.get("userId") ? Cookie.get("userId") : false;
}

export function getShoppingListItemsArray() {
    return { "apples": "Apples", "pear": "Pear", "lemon": "Lemon", "peach": "Peach", "strawberries" :
            "Strawberries", "plums" : "Plums", "banana" : "Bananas","orange" : "Orange", "mandarin" : "Mandarin",
        "onion" : "Onion", "garlic" : "Garlic", 'tomatoes' : "Tomatoes",
        "paprika" : "Paprika", "cucumber" : "Cucumber", "corn_in_tin" : "Corn in Tin", "carrot" : "Carrot",
        "white_carrot" : "White Carrot", "mushrooms" : "Mushrooms", "soup_vegetables" : "Soup Veggies",
        "potatoes" : "Potatoes","water": "Water", "beer": "Beer", "kubus": "Kubus", "wine": "Wine",
        "soft_drink" : "Soft Drink", "fruit_juice" : "Fruit Juice", "coffee_capsules" : "Coffee Capsules", "tea" : "Tea",
        "inka_coffee" : "Inka Coffee", "other_drinks" : "Other Drinks","milk": "Milk", "joghurt": "Joghurt",
        "white_Cheese": "White Cheese", "cream": "Cream", "cocoa_drink" : "Cocoa Drink",
        "butter" : "Butter", "cheese" : "Cheese", "chocolate" : "Chocolate", "coffee_whitener" : "Coffee Whitener",
        "chicken_wings": "Chicken Wings", "chicken_leg_full": "Full Chicken Leg", "chicken_breast": "Chicken Breast",
        "pork_loins": "Pork Loin Slices", "pork_tenderloin_lon" : "Pork Tenderloin Long", "beef" : "Beef",
        "mince_pork" : "Mince Pork", "mince_beef" : "Mince Beef",  'fish_fingers' : "Fish Fingers",
        "frozen_seafood" : "Frozen Seafood", "frozen_pizza" : "Frozen Pizza",
        "salami" : "Salami", "ham" : "Ham", "sausage" : "Sausage", "fish_in_tin" : "Fish in Tin", "tuna" : "Tuna",
        "bread": "Bread", "kakaos_csiga": "Kakaos Csiga", "turos_batyu": "Túrós Bukta", "kifli": "Kifli",
        "sweet_bun" : "Sweet Bun", "abonett" : "Abonett", "wasa_bread" : "WASA Bread", "csoki_maci" : "Csoki Maci",
        "vanilias_karika" : "Vaniliás Karika","toilet_paper": "Toilet Paper", "washing_up_liquid": "Washing Up Liquid",
        "washing_liquid": "Washing Liquid", "paper_roll": "Paper Roll", "liquid_soap" : "Liquid Soap",
        "shower_gel" : "Shower Gel", 'shampoo' : "Shampoo", 'toothpaste' : "Toothpaste",
        "cleaning_wipes" : "Cleaning wipes", 'rubbish_bin' : "Rubbish Bibs", "baking_paper" : "Baking Paper",
        "deodorant" : "Deodorant", "pantiliner" : "Pantiliner", "toilet_duck" : "Toilet Duck",
        "shaving_foam" : "Shaving Foam", "shaving_razors" : "Shaving Razors", "flour" : "Flour",
        "sugar" : "Sugar", "cooking_oil" : "Cooking Oil", "salt" : "Salt", "eggs" : "Eggs",
        "rice" : "Rice", "pasta" : "Pasta", "spices" : "Spices", "ketchup" : "Ketchup",
        "ropi_paluszki" : "Ropi/Paluszki", "nuts" : "Nuts", "köles_golyó_chrópki" : "Köles Golyó/Chrópki",
        "extra_1" : "Extra Product 1", "extra_2" : "Extra Product 2", "extra_3" : "Extra Product 3",
        "extra_4" : "Extra Product 4", "extra_5" : "Extra Product 5"};
}