
var config = {
  port: process.env.PORT || 8080,
  jwt_passphrase: process.env.JWT_PASSPHRASE || 'SomePassPhrase'
};

module.exports = config;