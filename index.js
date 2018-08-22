let restify = require('restify');
let users = require('./routes/users')

let server = restify.createServer();

server.use(restify.plugins.queryParser({
    mapParams: true
}));
server.use(restify.plugins.bodyParser({
    mapParams: true
}));
server.use(restify.plugins.acceptParser(server.acceptable));

server.get('/users', users.getUsers);
server.get('/users/:uid', users.getUser);
server.post('/users', users.newUser);
server.put('/users/:uid', users.updateUser);
server.del('/users/:uid', users.deleteUser);

server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});