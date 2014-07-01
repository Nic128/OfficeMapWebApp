var webApp = angular.module("webApp",["ui.bootstrap","ngRoute"]);

// Define global methods in rootScope
webApp.run(function($rootScope,$http,$location,$log,JsonService,saveService) {

    $rootScope.persons = [];
	$rootScope.selectedPerson = null;
	
	$rootScope.toggledMenu = "";
	$rootScope.toggleMenu = function(){
		$rootScope.toggledMenu = ($rootScope.toggledMenu === "") ? "active" : "";
	};
	
	// Get selected contact
	$rootScope.getSelectedPerson = function(){
		return $rootScope.selectedPerson;
	};
	
	// Set selected contact
	$rootScope.setSelectedPerson = function(contact){
		$rootScope.selectedPerson = contact;
	};
	
	// Set selected contact
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
	
	// Toggle search field
	$rootScope.isSearch = false;
	$rootScope.toggleSearch = function(){
		$rootScope.isSearch = !$rootScope.isSearch;
	};
	
	// Toggle "selected" class if person is selected
	$rootScope.selectedClass = function(person){
		return ($rootScope.isSelected(person)) ? "selected" : "";
	};
	
	$rootScope.isCurrentSection = function(section){
		return ($location.path().indexOf(section) == -1) ? "" : "active";
	};
	
	$rootScope.changeSection = function(section) {
	  $location.path("/"+section);
	};
	
	$rootScope.$on("$routeChangeStart", function (event, next, current) {
		// If LocalStorage Exist
		if (localStorage.saveService && localStorage.restoreState) {
			$rootScope.$broadcast('restorestate'); //let everything know we need to restore state
		}
		else{ // Load Json
			JsonService.success(function(data, status, headers, config){
				$rootScope.persons = data;
			});
		}
	});

	//let everything know that we need to save state now.
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
        redirectTo: "/edit-map"
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

