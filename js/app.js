var webApp = angular.module("webApp",["ui.bootstrap","ngRoute"]);

// Define global methods in rootScope
webApp.run(function($rootScope) {
  
});

// Routing
webApp.config(function($routeProvider, $locationProvider) {

    $routeProvider.when("/", {
		templateUrl: "/edit-map.html",
		controller: "MapCtrl",
    })
    .when("/editUsers", {
		templateUrl: "/edit.html",
		controller: "EditCtrl",
    })
    .otherwise({
        redirectTo: "/"
    });

    // Configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
  
});

// Get JSON, returns promise
webApp.factory("Data", ["$http","$log", function($http,$log){
	return $http.get("js/data.json");
}]);

// Map Utilities
webApp.factory("MapUtils", ["$http","$log", function($http,$log){
	
	var map = {};
	map.selectedPerson = null;
	map.xValue = 0;
	map.yValue = 0;
	
	// Get selected person
	map.getSelectedPerson = function(){
		return map.selectedPerson;
	};
	
	// Set selected person
	map.setSelectedPerson = function(person){
		map.selectedPerson = person;
	};
	
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
