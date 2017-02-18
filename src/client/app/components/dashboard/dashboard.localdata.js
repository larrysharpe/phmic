(function () {
    'use strict';

/*    var DashboardLocalData = {
        client: {
          address: '2113 Ash Street',
          city: 'Glenwood',
          name: 'John Smith',
          state: 'MA',
          zip: '46732'
        },
        policies: [
            {name: 'Businessowners Policy', num: 'BOP 3241253 14', summary: lorem },
            {name: 'Commercial Auto Policy', num: 'CAU 1212332 14', summary: lorem },
            {name: 'Personal Auto Policy', num: 'APV 00033249 00', summary: lorem },
        ]
    };*/

    angular
        .module('app.dashboard')
        .value('DashboardLocalData', DashboardLocalData);



})();
