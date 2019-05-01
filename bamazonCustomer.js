var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  // run the start function after the connection is made to prompt the user
  start();
});


function start(){
    inquirer.prompt({
        name: "browseOrBuy",
        type: "list",
        message: "Would you like to [BROWSE] our products or [BUY] one?",
        choices: ["BROWSE", "BUY", "EXIT"]
    }).then(function(answer){
        if (answer.browseOrBuy === "BROWSE"){
            browseProducts();
        } else if(answer.browseOrBuy === "BUY"){
            selectProduct();
        } else{
            // when exit is selected it closes the connection
            connection.end();
        }
    });
}

function browseProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        start();
    });
}

function selectProduct(){
    inquirer.prompt({
        name: "productId",
        type: "input",
        message: "What item would you like to purchase? Enter product ID",
        validate: function(value) {
            if (isNaN(value)) {
                return false;
            }
            return true;
        }
    }).then(function(answer){
        connection.query("SELECT * FROM products WHERE ID=" + answer.productId, function(err, res){
            if (err || res == ""){
                console.log("Invalid id, product does not exist");
                console.log(err);
                start();
            } else{
                buyProducts(answer.productId);
            }
        });
    });
}

function buyProducts(productId){
    inquirer.prompt(
        {
            name: "productQuantity",
            type: "input",
            message: "How many of that product would like to purchase?",
            validate: function(value) {
                if (isNaN(value)) {
                    return false;
                }
                return true;
            }
        }
    ).then(function(answer){
        connection.query("SELECT stock_quantity FROM products WHERE ID = " + productId, function(err, res){
            var product = res[0]; // get the first item in the array from the database
            if (product.stock_quantity >= answer.productQuantity){
                connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: product.stock_quantity - answer.productQuantity
                    },
                    { 
                        id: productId
                    }
                ],function(err2, res2){
                    if(err2) {
                        console.log("Failed to purchase item!");
                        console.log(err2);
                        start();
                    } else {
                        console.log("Item purchased");
                        start();
                    }
                });
            } else {
                console.log("Not enough stock to purchase! Stock Available: " + product.stock_quantity);
                start();
            }
        });
    });
}