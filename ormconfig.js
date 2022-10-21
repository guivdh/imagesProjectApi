module.exports = {
  "type": "postgres",
  "host": '127.0.0.1',
  "port": 5432,
  "username": 'postgres',
  "password": 'root',
  "database": 'imagesproject',
  "entities": [
    "dist/**/*.entity.js"
  ],
  "migrationsTableName": "migrations",
  "migrations": [
    "dist/migration/*.js"
  ],
  "cli": {
    "migrationsDir": "migration"
  }
};
