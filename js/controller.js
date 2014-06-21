var webApp = angular.module("webApp",['ui.bootstrap','ngRoute']);

webApp.factory('Data', function($http,$log){
    
	return $http.get("js/data.json");
});

webApp.controller("IndexCtrl",function($scope,$http,$modal,$log,Data){

	// Initialize empty array
	Data.success(function(data, status, headers, config){
		$scope.persons = data;
	});
	
	$scope.save = function(){
	
		var modalInstance = $modal.open({
		  templateUrl: 'myModalContent.html',
		  controller: "ModalInstanceCtrl"
		});
		
		modalInstance.result.then(function (selectedItem) {
		  $scope.selected = selectedItem;
		}, function () {
		  $log.info('Modal dismissed at: ' + new Date());
		});
	}
	
})
.directive('navBar', function() {
    return {
      templateUrl: 'templates/nav-bar.html'
    };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

webApp.controller("ModalInstanceCtrl", function ($scope, $modalInstance, $log, $http, Data) {

	// Initialize empty array
	Data.success(function(data, status, headers, config){
		$scope.persons = data;
	});

  $scope.ok = function () {
  
	// Get data
	$http.post("js/data.json",$scope.persons).success(function(responseData){
		$log.log(responseData);
	}).error(function(responseData){
		$log.log(responseData);
	});
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

webApp.controller("MapCtrl",function($log){

	this.changePosition = function(){
	
		this.selectedPerson.xValue = this.xValue;
		this.selectedPerson.yValue = this.yValue;
		
		this.selectedPerson.style = {'left':this.selectedPerson.xValue+'px','top':this.selectedPerson.yValue+'px'};
		
	};
	
	this.select = function(person){
		
		this.selectedPerson = person;
		
		this.xValue = (person.xValue) ? person.xValue : 0;
		this.yValue = (person.yValue) ? person.yValue : 0;
		
		this.selectedPerson.style = {'left':this.selectedPerson.xValue+'px','top':this.selectedPerson.yValue+'px'};

	};
	
	this.selectedClass = function(person){
		return (this.isSelected(person)) ? "selected" : "";
	};
	
	this.isSelected = function(person){
		return (this.selectedPerson == person) ? true : false;
	};
	
	this.inputDisabled = function(){
		return (this.selectedPerson == null) ? true : false;
	};
	
	this.unselect = function(){
		this.selectedPerson = null;
		this.xValue = null;
		this.yValue = null;
	};
	
	this.initPosition = function(person){
		
		person.xValue = (person.xValue) ? person.xValue : 0;
		person.yValue = (person.yValue) ? person.yValue : 0;
		
		person.style = {'left':person.xValue+'px','top':person.yValue+'px'};

	};

});

webApp.config(function($routeProvider, $locationProvider) {

  $routeProvider.when('/', {
    templateUrl: '/index.html',
    controller: 'IndexCtrl',
  })
  .when('/edit/', {
    templateUrl: '/edit.html',
    controller: 'EditCtrl',
  });

  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
  
});

webApp.controller("elementCtrl", function(){

	this.isEditing = false;
	
	this.enterEditing = function(el){
		this.tempData = el;
		this.isEditing = true;
	};
	
	this.cancelEditing = function(el){
		el = this.tempName;
		this.isEditing = false;
	};
	
	this.submit = function(){
		this.isEditing = false;
	}

});


webApp.controller("EditCtrl", ["$scope","$http","$log","$route","$location","$routeParams", function($scope,$http,$log,$route,$location,$routeParams){
	
	// Initialize empty array
	$scope.persons = [];
	
	$scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

	
	
	$scope.deletePerson = function ( idx ) {
		$scope.persons.splice(idx, 1);
	};
	
	$scope.isCollapsed = true;
	$scope.toggleNavBar = function(){
		$scope.isCollapsed = !$scope.isCollapsed;
	};
	
	$scope.createUser = function(){
		$scope.persons.unshift({
			"name":"",
			"gender":"Male",
			"email":"",
			"job":"",
			"image":""
		});
	}
}]);