const PORT = 1211;
const restify = require('restify');
const server = restify.createServer();


server.listen(PORT, function() {
  console.log('%s listening at %s', server.name, PORT);
});
