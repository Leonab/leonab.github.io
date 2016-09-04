angular.module('MyApp', ['ngMaterial', 'angular-loading-bar', 'ngAnimate'])

.config(function($mdThemingProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('pink')
        .accentPalette('orange');


})



.controller('TopGit', ['$scope', '$http', '$mdSidenav', function($scope, $http, $mdSidenav) {
    $scope.$watch('search', function() {
        fetch();
    });

    $scope.toggleSidenav = function(menuId) {
      
        $mdSidenav(menuId).toggle();
    };

    $scope.search = "php";

    function fetch() {

        $http.get("https://api.github.com/search/repositories?q=language:" + $scope.search + "&stars:>500&order=desc")
            .then(function(response) {

                $scope.details = response.data;

            });


    }

    $scope.select = function() {

        this.setSelectionRange(0, this.value.length);
    }


}])




.filter('rangeFilter', function() {

    return function(items, rangeInfo) {

        var filtered = [];
        var min = 500;
        var max = rangeInfo;

        // If time is with the range
        angular.forEach(items, function(item) {

            if (item.stargazers_count >= min && item.stargazers_count <= max) {

                filtered.push(item);
            }
        });

        return filtered;
    };
});