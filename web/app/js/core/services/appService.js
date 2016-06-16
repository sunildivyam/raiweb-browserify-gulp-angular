'use strict';
/*
*	appService
*	Description
*	appService fetches the data for all $http requests and keeps a cache for each.
*	And supplies data from cache for subsequent requests unless forced call is requested
*/

(function() {
	var appService = function($q, $http) {
		var cachedReqs = {};

		function getDataFromCache(url) {
			if (url && typeof url === 'string') {
				return cachedReqs[url];
			}
			return;
		}
		function executeDataRequest(url, forced) {
			var cachedReq = getDataFromCache(url);
			var defferedObj = $q.defer();
			if (forced === true || !cachedReq) {
				$http.get(url).then(function(response) {
					if (response && response.data) {
						cachedReqs[url] = response.data;
						var resData = angular.copy(response.data);
						defferedObj.resolve(resData);
					} else {
						defferedObj.reject(response);
					}
				}, function(rejection) {
					defferedObj.reject(rejection);
				});
			} else {
				var resData = angular.copy(cachedReq);
				defferedObj.resolve(resData);
			}

			return defferedObj.promise;
		}

		return {
			requestData: executeDataRequest
		};
	};

	appService.$inject = ['$q', '$http'];
	module.exports = appService;
})();
