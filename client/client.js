var app = angular.module('addressApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/index.html',
            controller: 'MainController'
        })
        .when('/addressDisplay', {
            templateUrl: 'views/addressDisplay.html',
            controller: 'AddressDisplayController'
        })
        .when('/orderLookup', {
            templateUrl: 'views/orderLookup.html',
            controller: 'OrderLookupController'
        })
}]);

app.controller('MainController', ['$scope', function($scope) {

    $scope.clicked = false;

    $scope.showViews = function() {
        $scope.clicked = true;
    }
}]);

app.controller('AddressDisplayController', ['$scope', '$http', function($scope, $http) {

    $scope.getAddresses = function() {
        var id = {params: {id: $scope.idSelected.id}};
        console.log(id);

        $http.get('/api/getAddresses', id).then(function(response) {
            $scope.addresses = response.data;
        }).catch(function(error) {
            console.log(error);
        })
    };

    function getNames() {
        $http.get('/api/getNames').then(function(response) {
            $scope.people = response.data;
        }).catch(function(error) {
            console.log(error);
        })
    }

    getNames();
}]);

app.controller('OrderLookupController', ['$scope', '$http', function($scope, $http) {

    $scope.table = false;

    $scope.submit = function() {
        getOrders();
    };

    function getOrders() {
        var searchInfo = {params: {id: $scope.idSelected.id,
                                    beginningDate: $scope.beginningDate.toISOString(),
                                    endingDate: $scope.endingDate.toISOString()}};

        $http.get('/api/getOrders', searchInfo).then(function(response) {
            $scope.calcTotal = 0;
            $scope.table = true;
            $scope.orders = response.data;

            for(var i = 0; i < $scope.orders.length; i++) {
                var thisOrder = $scope.orders[i];

                thisOrder.amount = convertNumber(thisOrder.amount);
                $scope.calcTotal += thisOrder.amount;
                thisOrder.amount = (thisOrder.amount).toFixed(2);

                thisOrder.order_date = thisOrder.order_date.substring(0, 10);
                thisOrder.order_date = convertDate(thisOrder.order_date);
            }
            $scope.displayTotal = $scope.calcTotal.toFixed(2);
        }).catch(function(error) {
            console.log(error);
        })
    }

    function getNames(){
        $http.get('/api/getNames').then(function(response) {
            $scope.people = response.data;
        }).catch(function(error) {
            console.log(error);
        })
    }

    getNames();
}]);

function convertNumber(number) {
    var dollars = (number.substring(0, number.indexOf('.')));
    var cents = (number.substring(number.indexOf('.') + 1, number.length + 1));
    dollars = parseInt(dollars);
    cents = parseInt(cents);
    var total = (dollars + (cents/100));
    return total;
}

function convertDate(date) {
    var month = date.substring(5, 7);
    var day = date.substring(8, 10);
    var year = date.substring(0, 4);
    return month + '-' + day + '-' + year;
}
