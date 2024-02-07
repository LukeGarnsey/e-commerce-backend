# E-Commerce-Backend
This is a repo to host an app for displaying CRUD operations on an e-commerce platform.
The routes are able to getall, getID, post, put, delete on all items.

[App Demo Video](https://drive.google.com/file/d/1fwM7jcs8UZk45L1h8RuOEeDTUv5s4dzN/view?usp=sharing)

## Install/Local Usage
This application requires [Node](https://nodejs.org) to be installed.
Clone the repo, then run 'npm i' inside the directory with the package.json file.
To deploy app locally,
enter password for mysql root user in the .env file.
Run the database setup in 'schema.sql' as mysql root user with 'source schema.sql;  
To setup the app with seed data, in root directory run 'npm run seed'.
run 'node server' to start the application.
The server should be ready to receive Get/post/put/delete requests.


## Credits
This app is a CLI [Node](https://nodejs.org) application   
### npm package
[Sequalize](https://www.npmjs.com/package/sequelize)  
[mysql2](https://www.npmjs.com/package/mysql2)  
[DotEnv](https://www.npmjs.com/package/dotenv)
[Express](https://www.npmjs.com/package/express)
