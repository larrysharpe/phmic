var router = require('express').Router();
var four0four = require('./utils/404')();
var people = require('./data/People');


router.post('/login', login);

router.get('/people', getPeople);
router.get('/people/:id', getPerson);

router.get('/policies/:userid', getPoliciesByUser);
router.get('/policy/:id', getPoliciesById);


router.get('/*', four0four.notFoundMiddleware);


module.exports = router;

//////////////


function login (req, res, next){
    res.status(200).send({yo:"yo"});
}

function getPeople(req, res, next) {
    res.status(200).send(people);
}

function getPerson(req, res, next) {
    var id = +req.params.id;


    console.log(people);
    var person = people.module.filter(function(p) {
        return p.id === id;
    })[0];

    if (person) {
        res.status(200).send(person);
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}

function getPoliciesByUser (req, res, next){
    res.status(200).send(people.getPoliciesByUser);
}


function getPoliciesById (req, res, next){

}
