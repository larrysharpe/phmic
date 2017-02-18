

var  policies = require('./data/PolicyGlobal');
var people = require('./data/People');



var  getPeople = function () {
    return people;
}

var getPoliciesByUser = function (userid){

    userid = 2;

    return policies.filter(function(policy){
        if(policy.userid  === userid ) return policy;
    });

    return userid;
}


var getPolicyById = function (policyId) {
    return policyId;
}



module.exports = {
    people: getPeople(),
    getPoliciesByUser: getPoliciesByUser(),
    getPolicyById: getPolicyById()
};
