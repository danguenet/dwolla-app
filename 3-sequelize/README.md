# Sequelize

1. Globally install sequelize-cli

```
npm install -g sequelize-cli
```

2. Install `sequelize`, `pg`, `pg-promise`, and `dotenv`

```
npm install sequelize pg pg-hstore dotenv

```

3. Create `.sequelizerc` file in the root of your project with the following code

```javascript
const path = require("path");

module.exports = {
  config: path.resolve("server/config", "config.js"),
  "models-path": path.resolve("server", "models"),
  "seeders-path": path.resolve("server", "seeders"),
  "migrations-path": path.resolve("server", "migrations"),
};
```

4. Initialize Sequelize in the terminal

```
sequelize init
```

5. Replace `server/config/config.js` with

```javascript
module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
  },
  production: {
    use_env_variable: process.env.PROD_DB_URL,
  },
};
```

6. Create a `.env` file in the root of your project. Replace admin with the password you used while downloading PostgreSQL.

```
DEV_DB_USERNAME=postgres
DEV_DB_PASSWORD=admin
DEV_DB_NAME=postgres
```

7. Update app.js to add this code below under `const port` but above `handlebars`

```javascript
require("dotenv").config();

const db = require("./server/models");
db.sequelize.sync();
```

8. Create `docker-compose.yml` file in the root directory and copy the following config:
```
version: '3.1'
   
   services:
   
     db:
       image: postgres
       restart: always
       environment:
         POSTGRES_PASSWORD: admin
       networks:
         - test
   
   networks:
     test:
       driver: bridge
```

9. To manage postgres, add npm scripts called `build-db` and `cleanup-db`:
 ```
"scripts": {
    "dev": "nodemon app",
    "build-db": "docker-compose up -d",
    "cleanup-db": "docker-compose down"
  },
```

10. To start postgres, run `npm run build-db` in your terminal

11. In your terminal run `npm run dev` and you should see this output:

```
Dwolla App listening at http://localhost:3000
Executing (default): SELECT 1+1 AS result
```
