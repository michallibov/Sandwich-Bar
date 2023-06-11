This project contains MySQL database. In order to create the databade correctly, please follow the following commands:
  1. CREATE DATABASE test;   
  2. CREATE TABLE sandwiches (
                              id int AUTO_INCREMENT, 
                              title varchar(45) NOT NULL, 
                              desc varchar(200), 
                              price double NOT NULL, 
                              image varchar(200) NOT NULL
                              );
  3. Fill the table with data like the following:
     INSERT INTO sandwiches VALUES ( 
                                    sandwich-title, 
                                    sandwich description,
                                    10.00,
                                    sandwich-image-url
                                    );
                                    
  4. now create the customers table: CREATE TABLE customers (
                                                         customerID int AUTO_INCREMENT,
                                                         name varchar(10) NOT NULL,
                                                         password varchar(10) NOT NULL
                                                         ); 
  5. Fill the table with data like the following:
     INSERT INTO customers VALUES (
                                   customer-name,
                                   password
                                   );
  6. now create the reviews table: CREATE TABLE reviews (
                                                         id int AUTO_INCREMENT,
                                                         customerID int NOT NULL,
                                                         review varchar(200) NOT NULL,
                                                         reviewTitle varchar(30),
                                                         stars int NOT NULL
                                                         );
  7. Fill the table with data like the following:
     INSERT INTO reviews VALUES (
                                 1,
                                 the-review,
                                 the-title, 
                                 5
                                 );

***I did not implement the sign up option yet so the customers and the reviews should be created by hand for now. 
