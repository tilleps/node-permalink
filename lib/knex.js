

var config = require('../config/dbs/postgres/knexfile');

//console.log('config', config);

var knex = require('knex')(config);

module.exports = knex;
