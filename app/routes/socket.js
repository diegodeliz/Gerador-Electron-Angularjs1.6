var Socket = require('../models/socket');
var Generator = require('../models/generator');

function getSockets(res) {
    Socket.find(function (err, socket) {
        if (err) res.send(err);
        res.json(socket);
    });
};

module.exports = function (app) {
    app.all('/', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    app.get('/api/socket', function (req, res) {
        getSockets(res);
    });
    //GetByID
    app.get('/api/socket/:socket_id', function (req, res) {
        Socket.find({ "_id": req.params.socket_id }, {}, function (e, docs) {
            res.json(docs);
        });
    });
    app.post('/api/socket', function (req, res) {
        var socket = new Socket({
            nome: req.body.nome,
            ip: req.body.ip,
            porta: req.body.porta,
            out: req.body.out
        });
        socket.save(function (err) {
            if (err) throw err;
            getSockets(res);
        });
    });
    app.delete('/api/socket/:socket_id', function (req, res) {
        Socket.remove({
            _id: req.params.socket_id
        }, function (err, socket) {
            if (err) res.send(err);
            getSockets(res);
        });
    });
    app.put('/api/socket/:socket_id', (req, res) => {
        Socket.findOneAndUpdate({_id: req.body._id}, {
            $set: {
                nome: req.body.nome,
                ip: req.body.ip,
                porta: req.body.porta,
                out: req.body.out
                }
            }, {
                sort: {_id: -1},
                upsert: true
            }, (err, result) => {
                if (err) return res.send(err)
                res.send(result)
            })  
    });
};
