var kykomat = angular.module('kykomat', ['angularModalService', 'ui.bootstrap']);

kykomat.controller('mainController', function ($scope, $http, $filter, ModalService) {
    
    $scope.activeCategory = 1;
    $scope.currentStudentId = 1;
            
    $http.get('data/materials.json').success(function (data) {
        $scope.materials = data.materials;
    });
    $http.get('data/material-categories.json').success(function (data) {
        $scope.materialCategories = data.materialCategories;
    });
    $http.get('data/students.json').success(function (data) {
        $scope.students = data.students;
        $scope.currentStudent = $scope.students[0];
    });
    
    
    
    $scope.setActiveCategory = function (id) {
        $scope.activeCategory = id;
    };
    
    $scope.setActiveStundent = function (student) {
        $scope.currentStudentId = student.id;
        console.log(student);
    }
    
    $scope.filterUserMaterial = function(value, index, array) {
        
        // $scope.stundents might be undefined on load as it loads async.
        if($scope.students instanceof Array){
        // We filter the array by id, the result is an array
        // so we select the element 0
        var current_student = $filter('filter')($scope.students,{id:$scope.currentStudentId})[0];

        return current_student.materials.indexOf(value.id) !== -1;    
        }
    };
    
    $scope.addMaterialToCurrentStundent = function (material) {

    //Get the student
    var student = $filter('filter')($scope.students, { id: $scope.currentStudentId  }, true)[0];
        
    student.materials.push(material.id);
    };
    
    $scope.removeMaterialFromCurrentStundent = function (material) {
        
    //Get the student
    var student = $filter('filter')($scope.students, { id: $scope.currentStudentId  }, true)[0];
    
    // Remove material id from students materials.
    var index = student.materials.indexOf(material.id);
        
        // Ensure that the value exists at all.
        if(index !== (-1)){
               student.materials.splice(index, 1); 
        }

    };
    
    $scope.$watch('currentStudent', function(newValue, oldValue) {
        if (typeof newValue === 'object'){
          $scope.setActiveStundent(newValue);
        }
    });
    
    $scope.show = function() {
        console.log('Ping');
        ModalService.showModal({
            templateUrl: 'templates/modal.html',
            controller: "ModalController"
        }).then(function(modal) {
            console.log('Ping');
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.message = "You said " + result;
            });
        });
    };
    
});

kykomat.controller('ModalController', function($scope, $http, close) {
    
      $http.get('data/students.json').success(function (data) {
        $scope.students = data.students;
    });
    
    
 $scope.close = function(result) {
     console.log('Scope close: ' + result);
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };
    
    $scope.setActiveStundent = function (student) {
        $scope.currentStudentId = student.id;
        console.log(student);
    }    
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

kykomat.directive('mainNavigation', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/main-navigation.html' // markup for template
    };
});