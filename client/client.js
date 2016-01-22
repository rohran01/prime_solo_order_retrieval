var app = angular.module('addressApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/addressDisplay', {
            templateUrl: 'views/addressDisplay.html',
            controller: 'AddressDisplayController'
        })
        .when('/orderLookup', {
            templateUrl: 'views/orderLookup.html',
            controller: 'OrderLookupController'
        })

}]);

app.controller('AddressDisplayController', ['$scope', '$http', function($scope, $http) {

    $scope.getAddresses = function() {
        var id = {params: {id: $scope.idSelected.id}};

        $http.get('/api/addressDisplay', id).then(function(response) {
            $scope.addresses = response.data;
        }).catch(function(error) {
            console.log(error);
        })
    };

    function getNames(){
        $http.get('/api/getNames').then(function(response) {
            $scope.people = response.data;
        }).catch(function(error) {
            console.log(error);
        })
    }

    getNames();
}]);

app.controller('OrderLookupController', ['$scope', '$http', function($scope, $http) {

    function getNames(){
        $http.get('/api/getNames').then(function(response) {
            $scope.people = response.data;
            console.log($scope.people);
        }).catch(function(error) {
            console.log(error);
        })
    }

    getNames();
}]);

function getNames(){
    $http.get('/api/getNames').then(function(response) {
        console.log(response);
    }).catch(function(error) {
        console.log(error);
    })
}