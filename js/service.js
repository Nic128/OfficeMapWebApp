webApp.factory('JsonService', ['$http', function($http) {
	return $http.get("js/data.json");
}]);

webApp.factory('saveService', ['$rootScope', function ($rootScope) {
	
	// Is HTML5 storage supported
	var isStorageSupported = (typeof(Storage) !== "undefined") ? true : false;

    var service = {

        SaveState: function () {
			if (isStorageSupported) {
				localStorage.saveService = angular.toJson($rootScope.persons);
				localStorage.restoreState = true;
			}
        },

        RestoreState: function () {
			if (isStorageSupported) {
				$rootScope.persons = angular.fromJson(localStorage.saveService);
				localStorage.restoreState = false;
			}
        },
		
		DataExist: function () {
			var dataExist = false;
			if (isStorageSupported) {
				dataExist = (localStorage.saveService) ? true : false;
			}
			return dataExist;
		}
    };

    $rootScope.$on("savestate", service.SaveState);
    $rootScope.$on("restorestate", service.RestoreState);

    return service;
	
}]);