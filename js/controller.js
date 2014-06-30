// ------------------------------------------------
// index.html "/"
// ------------------------------------------------

webApp.controller("MapCtrl",["$scope","$http","$modal","$log","MapUtils",function($scope,$http,$modal,$log,MapUtils){
	
	// Open modal window, to develop
	$scope.save = function(){
	
		var modalInstance = $modal.open({
		  templateUrl: "myModalContent.html",
		  controller: "ModalInstanceCtrl"
		});
		
		modalInstance.result.then(function (selectedItem) {
		  $scope.selected = selectedItem;
		}, function () {
		  $log.info("Modal dismissed at: " + new Date());
		});
		
	};

	// Change the person's position
	$scope.changePosition = function(){
		MapUtils.setPosition($scope.xValue,$scope.yValue,$scope.getSelectedPerson());
	};
	
	// Disable input if no selection
	$scope.inputDisabled = function(){
		return ($scope.getSelectedPerson() == null) ? true : false;
	};
	
	// Reset selection
	$scope.resetSelection = function(){
		$scope.resetPerson();
		$scope.xValue = null;
		$scope.yValue = null;
	};
	
	// Initialize person position
	$scope.initPosition = function(person){
		MapUtils.setPosition(person.xValue,person.yValue,person);
	};
	
}]);


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
// To Develop

webApp.controller("ModalInstanceCtrl", ["$scope","$modalInstance","$log","$http","$rootScope", function ($scope, $modalInstance, $log, $http, $rootScope) {

	$scope.ok = function () {
		// Post data
		/*$http.post("js/data.json",$scope.persons).success(function(responseData){
			$log.log(responseData);
		}).error(function(responseData){
			$log.log(responseData);
		});*/
		$modalInstance.close();
    };

    $scope.cancel = function () {
		$modalInstance.dismiss("cancel");
    };
	
}]);


// ------------------------------------------------
// edit.html "/editUsers"
// ------------------------------------------------

webApp.controller("EditUsersCtrl", ["$scope","$http","$log", function($scope,$http,$log){

	$scope.deletePerson = function ( idx ) {
		$scope.persons.splice(idx, 1);
	};

	$scope.createUser = function(){
		$scope.persons.unshift({
			"name":"New User",
			"gender":"Male",
			"email":"",
			"job":"",
			"image":""
		});
	};
	
}]);

// User information controller
webApp.controller("UserInfoCtrl", function($log){

	this.isEditing = false;
	this.tempData = {};
	
	this.enterEditing = function(el){
		this.tempData = angular.copy(el);
		this.isEditing = true;
	};
	
	this.cancelEditing = function(el){
		// Reset fields
		el.name = this.tempData.name;
		el.gender = this.tempData.gender;
		el.email = this.tempData.email;
		el.job = this.tempData.job;
		el.image = this.tempData.image;

		this.tempData = {};
		this.isEditing = false;
	};
	
	this.submit = function(){
		this.isEditing = false;
	};

});