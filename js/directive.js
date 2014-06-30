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
