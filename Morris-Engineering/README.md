# CSC441 - Morris Engineering website

Requirements: 
    - minimum 5 HTML pages
    - CSS descriptors
    - a Node.js web server
    - a MySQL database
    - a MongoDB database

  ## --  Dependencies -- ## 
├── npm@10.8.2
├── node@20.18.0
├── express@4.21.1
├── mongo@0.1.0
├── mongodb@6.10.0
├── mysql@2.18.1
└── mysql2@3.11.3

## -- MySQL Server Connection -- ##
To connect to the MySQL server do the following steps:
- ensure mysql2 is installed to version listed above
- Create a connection in MySQL Workbench with a table made called "contact"
- Have fields:
    - id int AUTO INCREMENT PRIMARY KEY
    - fname VARCHAR(32) NOT NULL
    - lname VARCHAR(32) NOT NULL
    - email VARCHAR(32) NOT NULL
    - message VARCHAR(500) NOT NULL
- change file 'Server.js' to match proper host, user, and password fields

## -- MongoDB Server Connection -- ##
To connect to the MongoDB server do the following steps:
- create a new, standard connection
- import (mongoDB-jobs-data.json), located in project folder
- change 'mongoURI' and 'dbName' variables in server file to match your mongoDB database