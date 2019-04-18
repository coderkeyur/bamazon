var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "triology",
    password: "password123",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("\n");
    console.log("------- WELCOME TO BAMAZON! -------- (" + connection.threadId + ")");
    console.log("\n");
})

function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return "Please enter a whole non-zero number.";
    }
};

function shop() {
    inquirer
        .prompt([{
            name: "item_id",
            type: "input",
            message: "What is the item_id of the product you want to buy? ",
            validate: validateInput,
            filter: Number
        }, {
            name: "quantity",
            type: "input",
            message: "How many units of the product you would like to buy?",
            validate: validateInput,
            filter: Number
        }]).then(function (answer) {
                
                var item = answer.item_id;
                var quantity = answer.quantity;


                connection.query("SELECT * FROM products WHERE ?", {item_id: item}, function(err, res) {
                    if (err) throw err;

                    if (res.length === 0) {
                        console.log("**** INVALID Item ID, please enter valid item ID. ****");
                        displayStore();
                    } else {
                        var productRes = res[0];

                        if (quantity <= productRes.stock_quantity){
                            console.log("Product is in stock, placing order!");

                            var updateQueryStr = "UPDATE products SET stock_quantity = " + (productRes.stock_quantity - quantity) + " WHERE item_id = " + item;

                            connection.query(updateQueryStr, function(err, res) {
                                if (err) throw err;

                                console.log("Your order has been placed! Your total is $" + productRes.price * quantity);
                                console.log("Thank you for shopping at BAMAZON!");
                                console.log("\n------------------------------------------\n");

                               connection.end();
                            })
                        } else {
                            console.log("\n------------------------------------------\n");
                            console.log("Sorry, your order can not be placed due to insufficient quantity")
                            console.log("Please select from quantities we have or try out one of the new items!");
                            console.log("\n------------------------------------------\n");
                            displayStore();
                        }
                    }
                })
            })
};


function displayStore() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log("Existing Inventory: ");
        console.log("\n---------------------\n");

        console.table(res);
        console.log("\n----------------------\n");

        shop(res);
    })
};

function runBamazon(){
    displayStore();
}

runBamazon();
