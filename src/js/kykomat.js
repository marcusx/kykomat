var kykomat = angular.module('kykomat', []);

kykomat.controller('mainController', function ($scope, $http) {
        
    $http.get('/src/data/materials.json').success(function (data) {
        $scope.materials = data.materials;
    });
    $http.get('/src/data/material-categories.json').success(function (data) {
        $scope.materialCategories = data.materialCategories;
    });
    $http.get('/src/data/students.json').success(function (data) {
        $scope.students = data.students;
    });    
});

kykomat.directive('material', function () {
    return {
        templateUrl: 'templates/material.html'
    };
});

kykomat.directive('categoryBox', function () {
    return {
        transclude: true,
        templateUrl: 'templates/category-box.html'
    };
});

kykomat.directive('currentUser', function () {
    return {
        transclude: false,
        templateUrl: 'templates/current-user.html'
    };
});