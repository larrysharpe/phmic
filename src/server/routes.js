var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');


router.post('/login', login);
router.get('/login', login);

router.get('/people', getPeople);
router.get('/people/:id', getPerson);

router.get('/policies/:userid', getPoliciesByUser);
router.get('/policies/byType/:type', getPoliciesByType);
router.get('/policy/:id', getPolicy);


router.get('/*', four0four.notFoundMiddleware);


module.exports = router;

//////////////


var filterByEmail = function (user) {
    return
}

function login (req, res, next){

    //if (!req.body.email) res.status(500).send({error: 'email is required'});
    //if (!req.body.password) res.status(500).send({error: 'password is required'});

    var peopleEmail = data.people().filter(function (user) {
        if (user.email === req.body.email) return true;
    });

    //if (!peopleEmail.length) res.status(500).send({error: 'user not found'});
    //if (peopleEmail[0].password !== req.body.password) res.status(500).send({error: 'password invalid'});

    delete peopleEmail[0].password;

    res.send(peopleEmail[0]);
}

function getPeople(req, res, next) {
    res.status(200);
}

function getPerson(req, res, next) {
    var id = +req.params.id;


    var person = data.people().filter(function(p) {
        return p.id === id;
    })[0];

    if (person) {
        person.policies = data.getPoliciesByUser(id);
        res.status(200).send(person);
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}

function getPoliciesByUser (req, res, next){
    res.status(200).send(data.getPoliciesByUser);
}


function getPolicy(req, res, next){
    var policy = data.getPolicy(req.params.id);
    if (!policy) res.status(404);
    else res.status(200).send(policy);
}

function getPoliciesByType (req, res, next){
    var policies = data.getPoliciesByType(req.params.type);
    if (!policies) res.status(404);
    else res.status(200).send(policies);
}
