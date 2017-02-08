// Update with your config settings.

module.exports = {
  client: 'postgresql',
  //connection: "postgresql://postgres:testest@localhost/postgres?multipleStatements=0&timezone=UTC",
  //*
  //acquireConnectionTimeout: 1000,
  connection: {
    timezone: 'UTC',
    charset: 'utf8',
    multipleStatements: true,
    database: 'postgres',
    user:     'postgres',
    password: 'testtest'
  },
  //*/
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './migrations/',
    tableName: 'ConfigKnexMigration'
  },
  seeds: {
    directory: './seeds/'
  }
};
