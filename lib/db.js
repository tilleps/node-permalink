


var knex = require('./knex');
var shorten = require('./utils/shorten')();

var tableName = 'Permalink';



module.exports.findById = function findById(id, callback) {
  var query = knex(tableName)
  .first()
  .where('id', '=', id);
  
  //console.log('query', query.toString());
  
  return query.asCallback(callback);
};


module.exports.insert = function insert(data, callback) {
  
  var values = {
    //key: shorten.encode(data.id),
    url: data.url,
    description: data.description,
    notes: data.notes//,
    //added_timestamp: knex.fn.now()
  };
  
  return knex(tableName)
    .insert(values)
    .returning('*')
    .then(function (rows) {
      var query = table
        .where('id', '=', rows[0].id)
        .update({
          key: shorten.encode(rows[0].id)
        })
        .asCallback(callback);
    
      return query;
    });  
}