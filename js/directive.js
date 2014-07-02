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
    
	var isTouchDevice = !!("ontouchstart" in window);
	
	return function(scope, element, attr) {
	
	   if (isTouchDevice) {

            var tapping = false;

            element.bind("touchstart", function (e) {

                if (attr.touchMode === "start") {

                    scope.$apply(attr.pointerDraggable);

                    e.preventDefault();
					
					alert("touchstart");

                } else {

                    //element.addClass(attrs.touchClass);
                    tapping = true;

                }

            });

            element.bind("touchmove", function () {

                tapping = false;

            });

            element.bind("touchend", function (e) {

                tapping && scope.$apply(attr.pointerDraggable);

                e.preventDefault();

            });

        } else {
	
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
		  
		  element.on('touchstart', function(event) {
			scope.$apply(function() {
			ontouchFn.call(scope, event.which);
					});
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
	  
	  }
	  
    };
}]);
