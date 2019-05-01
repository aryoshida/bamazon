var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "locathost",
    port: 3000,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function(err){
    if (err) throw err;
    start();
});

function start(){
    inquirer
        .prompt({
            name: "browseOrBuy",
            type: "list",
            message: "Would you like to [BROWSE] our products or [BUY] one?",
            choices: ["BROWSE", "BUY", "EXIT"]
        }
        ).then(function(answer){
            if (answer.browseOrBuy === "BROWSE"){
                browseProducts();
            } else if(answer.browseOrBuy === "BUY"){
                buyProducts();
            } else{
                connection.end();
            }
        });
}

function isValidProduct(value){
    // get product by id = value
    // if product is null or not there, then product is not valid
    // else product is valid
}

function buyProducts(){
    inquirer
        .prompt([
            {
                name: "productId",
                type: "input",
                message: "What item would you like to purchase? Enter product ID",
                validate: function(value) {
                    if (isNaN(value)) {
                        return false;
                    }
                    if (!isValidProduct(value)) {
                        console.log("Choose a valid product");
                        return false;
                    }
                    return true;
                }
            },
            {
                name: "productQuantity",
                type: "input",
                message: "How many of that product would like to purchase?",
                validate: function(value) {
                    if (isNaN(value)) {
                        return false;
                    }
                    // TODO: instead of return true, check if there's enough stock
                    return true;
                }
            }
        ])
        .then(function(productId, productQuantity) {
            // update stock in database
            // return back to home
        });
}