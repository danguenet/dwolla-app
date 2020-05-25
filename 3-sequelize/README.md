# Sequelize

1. Install `sequelize`, `pg`, `pg-promise`, and `dotenv`

```
npm install sequelize pg pg-hstore dotenv

```

2. Create a folder in the root of your project called `server`. Within that folder make two folders called `config` and `models`.

3. In  the `models` folder create a file called `index.js` and place the following code in it:

```javascript
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

4. In the `config` folder create a file called `config.js` and add this code:

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

5. Create a `.env` file in the root of your project:

```
DEV_DB_USERNAME=postgres
DEV_DB_PASSWORD=admin
DEV_DB_NAME=postgres
```

6. Update app.js to add this code below under `const port` but above `handlebars`

```javascript
require("dotenv").config();

const db = require("./server/models");
db.sequelize.sync();
```

7. Create `docker-compose.yml` file in the root directory and copy the following config:
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

8. To manage postgres, add npm scripts called `build-db` and `cleanup-db`:
 ```
"scripts": {
    "dev": "nodemon app",
    "build-db": "docker-compose up -d",
    "cleanup-db": "docker-compose down"
  },
```

9. To start postgres, run `npm run build-db` in your terminal

10. In your terminal run `npm run dev` and you should see this output:

```
Dwolla App listening at http://localhost:3000
Executing (default): SELECT 1+1 AS result
```
