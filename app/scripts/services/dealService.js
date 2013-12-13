'use strict';

transApp.factory('dealService', ['$resource', function ($resource) {
    var Deal = $resource('/api/dealing/:id', {id: '@id'});

    Deal.new = function () {
        return {
            dealNumber: 0,
            ticketNumber: 'new Ticket',
            instrumentType: 'defaultType',
            nonBusinessDay: 'SYMMETRIC CASHFLOWS',
            counterparty: '',
            entity: '',
            relationShip: '',
            buyCurrency: '',
            buyAmount: 0,
            sellCurrency: '',
            sellAmount: 0,
            spotRate: 0,
            nearRate: 0,
            dealDate: '',
            nearDate: ''
        }
    }

    return Deal;
}]);

