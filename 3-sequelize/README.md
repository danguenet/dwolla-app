# Sequelize

1. Install sequelize-cli as a developer dependency

```
npm install sequelize-cli --save-dev
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

7. Update app.js to add this code below after `const port = 3000;`

```javascript
require("dotenv").config();

const db = require("./server/models");
db.sequelize.sync();
```

8. Download [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads). Please save the password you use in your password manager.

9. Open pgAdmin 4 app and do the following

- create new server
  - name `localhost`
  - hostname `localhost`
  - port `5432`
  - username `postgres`
  - the password should be the same one you used when you downloaded PostgreSQL

10. In your console run `npm run dev` and you should see this output:

```
Dwolla App listening at http://localhost:3000
Executing (default): SELECT 1+1 AS result
```

## Resources

- https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
- https://www.enterprisedb.com/edb-docs/d/postgresql/reference/manual/12.2/tutorial-createdb.html
- https://www.enterprisedb.com/postgres-tutorials/connecting-postgresql-using-psql-and-pgadmin
