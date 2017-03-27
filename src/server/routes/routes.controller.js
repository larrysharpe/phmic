var data = require('../data');
var jwt = require('jsonwebtoken');
var _tmpToken = 'dfev3t5v35vfevrverfevegbt5';
var tokens = {};

exports.passwordReset = function  (req, res, next) {
    if (!req.body.email) return res.status(500).send({error: 'email is required'});
    return res.status(200).send('ok');
}

exports.passwordResetToken = function  (req, res, next) {
    if (!req.body.email) return res.status(500).send({error: 'email is required'});
    return res.status(200).send('ok');
}

exports.createAccessPoint = function  (req, res, next){
    if (!req.body.email) return res.status(500).send({error: 'email is required'});
    if (!req.body.customerNumber) return res.status(500).send({error: 'customer number is required'});
    if (!req.body.accessCode) return res.status(500).send({error: 'access number is required'});
    console.log('Access Code Confirmed');
    return res.status(200).send('ok');
}

exports.createUserAccount = function  (req, res, next){
    if (!req.body.email) return res.status(500).send({error: 'email is required'});
    if (!req.body.customerNumber) return res.status(500).send({error: 'customer number is required'});
    if (!req.body.password) return res.status(500).send({error: 'password is required'});
    console.log('Access Code Confirmed');
    return res.status(200).send({token: _tmpToken});
}

exports.createAccessCode = function  (req, res, next){
    if (!req.body.email) return res.status(500).send({error: 'email is required'});
    if (!req.body.customerNumber) return res.status(500).send({error: 'customer number is required'});
    console.log('CODE: asfadgrtartartatvt');
    return res.status(200).send('ok');
}

exports.resendAccessCode = function  (req, res, next){
    if (!req.body.email) return res.status(500).send({error: 'email is required'});
    if (!req.body.customerNumber) return res.status(500).send({error: 'customer number is required'});
    console.log('CODE: asfadgrtartartatvt')
    return res.status(200).send('ok');
}


exports.login = function  (req, res, next){

    if (!req.body.email) return res.status(500).send({error: 'email is required'});
    if (!req.body.password) return res.status(500).send({error: 'password is required'});

    var email;
    var password;

    if (typeof Buffer.from === "function") {
        // Node 5.10+
        email = Buffer.from(req.body.email, 'base64').toString();
        password = Buffer.from(req.body.password, 'base64').toString();
    } else {
        // older Node versions
        email = new Buffer(req.body.email, 'base64').toString();
        password = new Buffer(req.body.password, 'base64').toString();
    }

    var peopleEmail = data.people().filter(function (user) {
        if (user.email === email) return true;
    });

    if (!peopleEmail.length) return res.status(500).send({error: 'user not found'});
    else if (peopleEmail[0].password !== password) return res.status(500).send({error: 'password invalid'});
    else {
        tokens[_tmpToken] = peopleEmail[0];
        return res.json({token: _tmpToken});
    }
}

exports.getPeople = function (req, res, next) {
    return res.status(200).send('ok');
}

exports.getPerson = function (req, res, next) {
    var id = +req.params.id;

    var person = data.people().filter(function(p) {
        return p.id === id;
    })[0];

    if (person) {
        person.policies = data.getPoliciesByUser(id);
        return res.status(200).send(person);
    } else {
        return four0four.send404(req, res, 'person ' + id + ' not found');
    }
}

exports.getPoliciesByUser = function  (req, res, next){
    return res.status(200).send(data.getPoliciesByUser);
}


exports.getPolicy = function (req, res, next){
    var policy = data.getPolicy(req.params.id);
    if (!policy) return res.status(404);
    else return res.status(200).send(policy);
}

exports.getPoliciesByType = function  (req, res, next){
    var policies = data.getPoliciesByType(req.params.type);
    if (!policies) return res.status(404);
    else return res.status(200).send(policies);
}

exports.getUser = function  (req,res,next) {

    if (!req.headers.authorization) {
        return res.sendStatus(401).send('not authorized');
    }

    var authToken = req.headers.authorization.replace(/Bearer /,'');

    if(tokens[authToken]) return res.send(tokens[authToken]);
    else return res.sendStatus(401).send('not authorized');
}
