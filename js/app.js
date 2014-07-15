var webApp = angular.module("webApp",["ui.bootstrap","ngRoute"]);

// Define global methods in rootScope
webApp.run(function($rootScope,$http,$location,$log,JsonService,saveService,$sce) {

    $rootScope.persons = [];
	$rootScope.selectedPerson = null;
	$rootScope.isSearch = false;
	
	// Get Persistent data or Json.
	if (saveService.DataExist()) {
		$rootScope.$broadcast('restorestate');
	}
	else {
		JsonService.success(function(data, status, headers, config){
			$rootScope.persons = data;
		});
	}
	
	// Simple sidebar toggle menu
	$rootScope.toggledMenu = "";
	$rootScope.toggleMenu = function(){
		$rootScope.toggledMenu = ($rootScope.toggledMenu === "") ? "active" : "";
	};
	
	// Get selected person
	$rootScope.getSelectedPerson = function(){
		return $rootScope.selectedPerson;
	};
	
	// Set selected person
	$rootScope.setSelectedPerson = function(contact){
		$rootScope.selectedPerson = contact;
	};
	
	// Reset selected person
	$rootScope.resetPerson = function(){
		$rootScope.selectedPerson = null;
	};
	
	// Is person selected
	$rootScope.isSelected = function(person){
		return ($rootScope.getSelectedPerson() === person) ? true : false;
	};
	
	// Select a person
	$rootScope.select = function(person){

		$rootScope.setSelectedPerson(person);
		
		$rootScope.xValue = person.xValue;
		$rootScope.yValue = person.yValue;

	};
	
	// Toggle "selected" class if person is selected
	$rootScope.selectedClass = function(person){
		return ($rootScope.isSelected(person)) ? "selected" : "";
	};
	
	// Toggle active class for section button links
	$rootScope.isCurrentSection = function(section){
		return ($location.path().indexOf(section) == -1) ? "" : "active";
	};
	
	// Change Section
	$rootScope.changeSection = function(section) {
	  $location.path("/"+section);
	};
	
	// Reset Data
	$rootScope.resetData = function() {
		JsonService.success(function(data, status, headers, config){
			$rootScope.persons = data;
		});
	};

	// On page unload, Save
	window.onbeforeunload = function (event) {
		$rootScope.$broadcast('savestate');
	};
	
});

// Routing
webApp.config(function($routeProvider, $locationProvider) {

    $routeProvider.when("/home", {
		templateUrl: "templates/home.html",
		controller: "MapCtrl"
    })
	.when("/edit-map", {
		templateUrl: "templates/edit-map.html",
		controller: "MapCtrl"
    })
    .when("/edit-users", {
		templateUrl: "templates/edit-users.html",
		controller: "EditUsersCtrl"
    })
    .otherwise({
        redirectTo: "/home"
    });

    // Configure html5 to get links working on jsfiddle
    //$locationProvider.html5Mode(true);
  
});

// Map Utilities
webApp.factory("MapUtils", ["$http","$log", function($http,$log){
	
	var map = {};
	map.xValue = 0;
	map.yValue = 0;
	
	// Get person position
	map.getPosition = function(){
		return {"xValue":map.xValue,"yValue":map.yValue};
	};
	
	// Set person position
	map.setPosition = function(xValue,yValue,person){
		map.xValue = person.xValue = xValue;
		map.yValue = person.yValue = yValue;
		person.style = {"left":xValue+"px","top":yValue+"px"};
	};
	
	return map;
	
}]);

