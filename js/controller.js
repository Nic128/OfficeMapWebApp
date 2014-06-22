// ------------------------------------------------
// index.html "/"
// ------------------------------------------------

webApp.controller("MapCtrl",["$scope","$http","$modal","$log","Data","MapUtils",function($scope,$http,$modal,$log,Data,MapUtils){
	
	// Get JSON Promise
	Data.success(function(data, status, headers, config){
		$scope.persons = data;
	});
	
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
	
	// Select a person
	$scope.select = function(person){
	
		MapUtils.setSelectedPerson(person);
		
		$scope.xValue = person.xValue;
		$scope.yValue = person.yValue;

	};
	
	// Change the person's position
	$scope.changePosition = function(){
		MapUtils.setPosition($scope.xValue,$scope.yValue,MapUtils.getSelectedPerson());
	};
	
	// Toggle "selected" class if person is selected
	$scope.selectedClass = function(person){
		return ($scope.isSelected(person)) ? "selected" : "";
	};
	
	// Is person selected
	$scope.isSelected = function(person){
		return (MapUtils.getSelectedPerson() == person) ? true : false;
	};
	
	// Disable input if no selection
	$scope.inputDisabled = function(){
		return (MapUtils.getSelectedPerson() == null) ? true : false;
	};
	
	// Reset selection
	$scope.resetSelection = function(){
		MapUtils.setSelectedPerson(null);
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

webApp.controller("ModalInstanceCtrl", ["$scope","$modalInstance","$log","$http","Data","$rootScope", function ($scope, $modalInstance, $log, $http, Data, $rootScope) {

	Data.success(function(data, status, headers, config){
		$scope.persons = data;
	});

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

webApp.controller("EditCtrl", ["$scope","$http","$log","Data", function($scope,$http,$log,Data){

	// Initialize empty array
	Data.success(function(data, status, headers, config){
		$scope.persons = data;
	});

	$scope.deletePerson = function ( idx ) {
		$scope.persons.splice(idx, 1);
	};

	$scope.createUser = function(){
		$scope.persons.unshift({
			"name":"",
			"gender":"Male",
			"email":"",
			"job":"",
			"image":""
		});
	};
	
}]);

// User information controller
webApp.controller("UserInfoCtrl", function(){

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
	};

});