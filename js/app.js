var webApp = angular.module("webApp",["ui.bootstrap","ngRoute"]);

// Define global methods in rootScope
webApp.run(function($rootScope,$http,$location,$log) {

    $rootScope.persons = [];
	$rootScope.selectedPerson = null;
	
	$http.get("js/data.json").success(function(data, status, headers, config){
		$rootScope.persons = data;
	});	
	
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
	
	// Toggle "selected" class if person is selected
	$rootScope.selectedClass = function(person){
		return ($rootScope.isSelected(person)) ? "selected" : "";
	};
	
	$rootScope.isCurrentSection = function(section){
		var path = $location.path();
		
		if (path.indexOf(section) == -1) return false;
		else return true;
	};
	
	$rootScope.changeSection = function(section) {
	  $location.path("/"+section);
	}
	
});

// Routing
webApp.config(function($routeProvider, $locationProvider) {

    $routeProvider.when("/edit-map", {
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

// Modal window directive
webApp.directive("modalWindow", function() {
    return {
	  restrict: "E",
      templateUrl: "templates/modal-window.html"
    };
});

// User information directive
webApp.directive("userInfo", function() {
    return {
	  restrict: "E",
      templateUrl: "templates/user-info.html",
	  controller: "UserInfoCtrl",
	  controllerAs: "user"
    };
});

// Drag and drop directive
webApp.directive("pointerDraggable", ["$document","$log","MapUtils", function($document,$log,MapUtils) {
    
	return function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;

      element.on("mousedown", function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
		x = scope.person.xValue;
		y = scope.person.yValue;
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on("mousemove", mousemove);
        $document.on("mouseup", mouseup);
      });

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        element.css({
          top: y + "px",
          left:  x + "px"
        });
		scope.person.xValue = x;
		scope.person.yValue = y;
      }

      function mouseup() {
        $document.off("mousemove", mousemove);
        $document.off("mouseup", mouseup);
      }
	  
    };
}]);
