var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {
        if (err) {
            res.send(err);
        }

        res.json(todos); 
    });
};

module.exports = function (app) {
    app.all('/', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    app.get('/api/todos', function (req, res) {
        getTodos(res);
    });
    app.post('/api/todos', function (req, res) {
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);
            getTodos(res);
        });

    });
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);
            getTodos(res);
        });
    });
    app.get('/api/todos/:todo_id', function(req, res) {   
        Todo.find({"_id": req.params.todo_id},{},function(e,docs){
            res.json(docs);
        });
    });
    app.put('/api/todos/:todo_id', (req, res) => {
        Todo.findOneAndUpdate({_id: req.body._id}, {
          $set: {
            text: req.body.text
          }
        }, {
          sort: {_id: -1},
          upsert: true
        }, (err, result) => {
          if (err) return res.send(err)
          res.send(result)
        })
    });   
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/dist/index.html');
    });
};
