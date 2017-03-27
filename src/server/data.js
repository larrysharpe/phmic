var policies = require('./data/PolicyGlobal.json');
var people = require('./data/People.json');
var personalAutoDriver = require('./data/personal-auto-driver-data.json');
var personalAutoUnit = require('./data/personal-auto-unit-data.json');
var personalInterests = require('./data/policy-interests-data.json');
var personalInterests2 = require('./data/policy-interests-data-2.json');
var personalInterests3 = require('./data/policy-interests-data-3.json');
var personalInterests4 = require('./data/policy-interests-data-4.json');
var personalInterests5 = require('./data/policy-interests-data-5.json');

var piMain = personalInterests.concat(personalInterests2, personalInterests3, personalInterests4, personalInterests5);


var  getPeople = function () {
    return people;
}

var getPoliciesByUser = function (userid){
    var res = [];

    for (var i = 0; i < policies.length; i++){
        if (policies[i].userid === Number(userid)) {
            res.push(policies[i]);
        }
    };

    var sortedPolicies = res.slice(0);
    sortedPolicies.sort(function(a,b) {
        var x = a.TypeName.toLowerCase();
        var y = b.TypeName.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });

    console.log(sortedPolicies);

    return sortedPolicies;
}

var getPoliciesByType = function (type){

    var res = [];

    for (var i = 0; i < policies.length; i++){
        if (policies[i].Type === type) res.push(policies[i].id);
    };

    return res;
}


var getpersonalauto = function (PolicyId){
    var data = {};
    var drivers = personalAutoDriver.filter(function(driver){
        return driver.PolicyId == PolicyId;
    }).slice(0,2);

    var units = personalAutoUnit.filter(function(unit){
        return unit.PolicyId == PolicyId;
    }).slice(0,2);

    var pi = piMain.filter(function(item){
        return item.PolicyId == PolicyId;
    }).slice(0,2);

    data.drivers = drivers;
    data.units = units;
    data.personalInterests = pi;

    return data;
};
var getbusinessowners = function (PolicyId){
    var data = {};
    var drivers = personalAutoDriver.filter(function(driver){
        return driver.PolicyId == PolicyId;
    }).slice(0,2);

    var units = personalAutoUnit.filter(function(unit){
        return unit.PolicyId == PolicyId;
    }).slice(0,2);

    var pi = piMain.filter(function(item){
        return item.PolicyId == PolicyId;
    }).slice(0,2);

    data.drivers = drivers;
    data.units = units;
    data.personalInterests = pi;

    return data;
};



 var getboatowners = function (PolicyId){
	var data = {};
	}
 var getcommercialauto = function (PolicyId){
	var data = {};
	}
 var getcommercialpackage = function (PolicyId){
	var data = {};
	}
 var getstudentprofessionalliability = function (PolicyId){
	var data = {};
	}
 var getdentistprofessionalliability = function (PolicyId){
	var data = {};
	}
 var getdentalhygenistprofessionalliability = function (PolicyId){
	var data = {};
	}
 var gethomeowners = function (PolicyId){
	var data = {};
	}
 var getmobilehomeowners = function (PolicyId){
	var data = {};
	}
 var getinlandmarinefloater = function (PolicyId){
	var data = {};
	}
 var getpharmacistsprofessionalliability = function (PolicyId){
	var data = {};
	}
 var getpharmacyservicesprofessionalliability = function (PolicyId){
	var data = {};
	}
 var getcommercialumbrella = function (PolicyId){
	var data = {};
	}
 var getpersonalumbrella = function (PolicyId){
	var data = {};
	}
 var getworkerscompensation = function (PolicyId){
	var data = {};
	}
 var getexcessprofessionalliability = function (PolicyId){
	var data = {};
	}

var getPolicyFull = {
    "personal-auto" : getpersonalauto,
    "businessowners" : getbusinessowners,
    "boatowners" : getboatowners,
	"commercial-auto" : getcommercialauto,
	"commercial-package" : getcommercialpackage,
	"student-professional-liability" : getstudentprofessionalliability,
	"dentist-professional-liability" : getdentistprofessionalliability,
	"dental-hygenist-professional-liability" : getdentalhygenistprofessionalliability,
	"homeowners" : gethomeowners,
	"mobile-home-owners" : getmobilehomeowners,
	"inland-marine-floater" : getinlandmarinefloater,
	"pharmacists-professional-liability" : getpharmacistsprofessionalliability,
	"pharmacy-services-professional-liability" : getpharmacyservicesprofessionalliability,
	"commercial-umbrella" : getcommercialumbrella,
	"personal-umbrella" : getpersonalumbrella,
	"workers-compensation" : getworkerscompensation,
	"excess-professional-liability" : getexcessprofessionalliability
}


var getPolicy = function (id) {

    var policy = null;

    for (var i = 0; i < policies.length; i++){
        if (policies[i].id == id) policy = policies[i];
    };

    if (policy){
        policy.data = getPolicyFull[policy.Type](policy.id);
    }

    return policy;
}



module.exports = {
    people: getPeople,
    getPoliciesByUser: getPoliciesByUser,
    getPolicy: getPolicy,
    getPoliciesByType: getPoliciesByType
};
