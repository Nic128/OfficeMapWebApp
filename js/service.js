webApp.factory('JsonService', ['$http', function($http) {
	return $http.get("js/data.json");
}]);

webApp.factory('saveService', ['$rootScope', function ($rootScope) {

    var service = {

        SaveState: function () {
            sessionStorage.saveService = angular.toJson($rootScope.persons);
			sessionStorage.restorestate = true;
        },

        RestoreState: function () {
            $rootScope.persons = angular.fromJson(sessionStorage.saveService);
        }
    };

    $rootScope.$on("savestate", service.SaveState);
    $rootScope.$on("restorestate", service.RestoreState);

    return service;
	
}]);