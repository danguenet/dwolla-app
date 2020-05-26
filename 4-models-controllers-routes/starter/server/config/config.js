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