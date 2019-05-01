DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45),
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

  INSERT INTO  products (product_name, department_name, price, stock_quantity)
  VALUES ("Product1", "Food", 5, 50),
  ("Product2", "Apparel", 60, 80),
  ("Product3", "Home", 20, 178),
  ("Product4", "Garden", 57, 5),
  ("Product5", "Automotive", 3000, 3),
  ("Product6", "Office", 150, 20),
  ("Product7", "Personal Care", 30, 49),
  ("Product8", "Electronics", 379, 12),
  ("Product9", "Toys & Games", 18, 200),
  ("Product10", "Pets", 20, 12);