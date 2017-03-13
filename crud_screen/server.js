/**
 * Created by Sony on 3/13/2017.
 */

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('sampledb', ['accountTypes']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/account', function(req, res){
    console.log('Received find all accountTypes request');
    db.accountTypes.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    })
});

app.get('/account/:id', function(req, res){
    console.log('Received findOne person request');
    db.Persons.findOne({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
        console.log(docs);
        res.json(docs);
    })
});

app.post('/addaccountType', function(req, res){
    console.log(req.body);
    db.accountTypes.insert(req.body, function(docs){
        console.log(docs);
        res.json(docs);
    })
});

app.delete('/deleteAccount/:id', function(req, res){
    console.log("Received delete one person request...");
    db.accountTypes.remove({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
        console.log(docs);
        res.json(docs);
    });
});

app.put('/updateAccount', function(req, res){
    console.log("Received updatePerson request");
    db.accountTypes.findAndModify({query: {"_id": new mongojs.ObjectId(req.body._id)},
        update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}}
    }, function(err, docs){
        console.log(docs);
        res.json(docs);
    })
});

//app.use(express.static(__dirname + "/app/views"));
app.listen(3000);
console.log("server running on port 3000");