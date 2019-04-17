var mysql = require("mysql");
var inquirer = require("inquirer");
var cli_table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "triology",
    password: "password123",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("------- WELCOME TO BAMAZON! -------- (" + connection.threadId + ")");
    console.log("-----------------------------------------------")
    displayStore();
})

function displayStore() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        shop(res);
    })
};

function shop(inventory) {
    inquirer
        .prompt([{
            name: "productID",
            type: "input",
            message: "What is the id of the product you want to buy?"
        }, {
            name: "unitsProduct",
            type: "input",
            message: "How many units of the product you would like to buy?"
        }, ]).then(function (answer) {
                // TODO WRITE FUNCTION THAT CHECKS INVENTORY
                connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?", {
                        item_id: answer.productID
                    }, function (err, results) {
                        if (err) throw err;
                        if 

                    }

                })
        })
};

function inventoryCheck() {

}