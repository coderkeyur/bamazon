# bamazon

BAMAZON is a node based store front. BAMAZON customer end displays items on sale, where you can select item you want to buy and the quantity  to complete purchase.  

This project is one of the initial MySQL project to create, read, update, and delete the fields of database. 

### screenshots
#### BAMAZON intro
![BAMAZON Intro](assets/bamazon_1.png)
#### BAMAZON ordering method
![BAMAZON Shop](assets/bamazon_2.png)
#### BAMAZON insufficent quantity for order
![BAMAZON insufficient quantity](assets/bamazon_3.png)

### BAMAZON supported commands and results
* bamazon customer front
    * View the items for sale
    * TO PURCHASE ITEMS
      * Select the Item_id of thee product you want to buy
      * enter the quantity of the product
* After purchase the database will update and display storefront with updated quantity of products. 
* If user enters invalid amount of quantity, It will show an error and re-display the storefront. 

### Deployment
1. Clone Repo
2. Run npm install
3. At command prompt run node bamazonCustomer.js ** (answer the prompt questions to make purchase) **

### technologies used
* nodeJS
* JavaScript
* NPM dotenv
* NPM inquirer
* NPM MySQL

### Author
Keyur Patel


