var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');
var jwt = require('jsonwebtoken');
var _tmpToken = 'dfev3t5v35vfevrverfevegbt5';

router.post('/unauth/validate', createAccessCode); /// create access code
router.post('/unauth/resend', resendAccessCode); /// resend access code
router.post('/unauth/access', createAccessPoint); /// ???
router.post('/unauth/user', createUserAccount); /// ???
router.post('/unauth/resetpassword', passwordReset); /// ???
router.post('/unauth/resetpassword/:token', passwordResetToken); /// ???
router.post('/auth', login); /// login


router.get('/clients', getPeople);
router.get('/clients/:id', getPerson);
router.get('/user/info', getUser);

router.get('/policies/:userid', getPoliciesByUser);
router.get('/policies/byType/:type', getPoliciesByType);
router.get('/policy/:id', getPolicy);


router.get('/*', four0four.notFoundMiddleware);


module.exports = router;

//////////////

var tokens = {};

function passwordReset (req, res, next) {
    if (!req.body.email) return res.status(500).send({error: 'email is required'});
    return res.status(200).send('ok');
}

function passwordResetToken (req, res, next) {
    if (!req.body.email) return res.status(500).send({error: 'email is required'});
    return res.status(200).send('ok');
}

function createAccessPoint (req, res, next){
    if (!req.body.email) return res.status(500).send({error: 'email is required'});
    if (!req.body.customerNumber) return res.status(500).send({error: 'customer number is required'});
    if (!req.body.accessCode) return res.status(500).send({error: 'access number is required'});
    console.log('Access Code Confirmed');
    return res.status(200).send('ok');
}

function createUserAccount (req, res, next){
    if (!req.body.email) return res.status(500).send({error: 'email is required'});
    if (!req.body.customerNumber) return res.status(500).send({error: 'customer number is required'});
    if (!req.body.password) return res.status(500).send({error: 'password is required'});
    console.log('Access Code Confirmed');
    var peopleEmail = data.people().filter(function (user) {
        if (user.email === req.body.email) return true;
    });
    return res.status(200).send({token: _tmpToken});
}

function createAccessCode (req, res, next){
    if (!req.body.email) return res.status(500).send({error: 'email is required'});
    if (!req.body.customerNumber) return res.status(500).send({error: 'customer number is required'});
    console.log('CODE: asfadgrtartartatvt');
    return res.status(200).send('ok');
}

function resendAccessCode (req, res, next){
    if (!req.body.email) return res.status(500).send({error: 'email is required'});
    if (!req.body.customerNumber) return res.status(500).send({error: 'customer number is required'});
    console.log('CODE: asfadgrtartartatvt')
    return res.status(200).send('ok');
}


function login (req, res, next){

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
        tokens[_tmpToken].policies = data.getPoliciesByUser(tokens[_tmpToken].id);
        return res.json({token: _tmpToken});
    }
}

function getPeople(req, res, next) {
    return res.status(200).send('ok');
}

function getPerson(req, res, next) {
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

function getPoliciesByUser (req, res, next){
    var policies = data.getPoliciesByUser(req.params.userid);
    return res.status(200).json(policies);
}


function getPolicy(req, res, next){
    var policy = data.getPolicy(req.params.id);
    if (!policy) return res.status(404);
    else return res.status(200).send(policy);
}

function getPoliciesByType (req, res, next){
    var policies = data.getPoliciesByType(req.params.type);
    if (!policies) return res.status(404);
    else return res.status(200).send(policies);
}

function getUser (req,res,next) {

    if (!req.headers.authorization) {
        return res.sendStatus(401).send('not authorized');
    }

    var authToken = req.headers.authorization.replace(/Bearer /,'');

    if(tokens[authToken]) return res.send(tokens[authToken]);
    else return res.sendStatus(401).send('not authorized');
}
