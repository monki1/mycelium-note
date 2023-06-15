const PORT = 1211;
const restify = require('restify');

const accountRoutes = require('./account');
const queryRoutes = require('./query');

const server = restify.createServer({
  name: 'Mycelium API',
  version: '1.0.0'
//  url: 'https://myapp.com'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.use(`/acc`, accountRoutes);
server.use(`/q`, queryRoutes);

server.listen(PORT, function() {
  console.log('%s listening at %s', server.name, PORT);
});


