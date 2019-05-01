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
                buyProducts();
            }
        });
    });
}

function buyProducts(){
    inquirer.prompt(
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
    ).then(function(productQuantity) {
        // update stock in database
        console.log("Item purchased!");
        start();
        // return back to home
    });
}