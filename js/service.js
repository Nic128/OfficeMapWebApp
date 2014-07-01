webApp.factory('JsonService', ['$http', function($http) {
	return $http.get("js/data.json");
}]);

webApp.factory('saveService', ['$rootScope', function ($rootScope) {

    var service = {

        SaveState: function () {
            localStorage.saveService = angular.toJson($rootScope.persons);
            localStorage.restoreState = true;
        },

        RestoreState: function () {
            $rootScope.persons = angular.fromJson(localStorage.saveService);
			localStorage.restoreState = false;
        }
    };

    $rootScope.$on("savestate", service.SaveState);
    $rootScope.$on("restorestate", service.RestoreState);

    return service;
	
}]);