'use strict';
/*
*	homeService
*	Description
*	homeService fetches the Home Page Level Data.
*/

(function() {
	var homeService = function($q, $http) {
		var url = 'app/data/app-header.json';
		var headerInfo = null;

		function getAppHeaderInfo() {
			var promiseObj = $q.defer();

			if (!headerInfo) {
				$http.get(url).then(function(response) {
					if (response && response.data) {
						headerInfo = response.data;
					} else {
						headerInfo = null;
					}
					promiseObj.resolve(headerInfo);
				}, function(error) {
					headerInfo = null;
					promiseObj.reject(error);
				});
			} else {
				promiseObj.resolve(headerInfo);
			}

			return promiseObj.promise;
		}

		return {
			getAppHeaderInfo: getAppHeaderInfo
		};
	};

	homeService.$inject = ['$q', '$http'];
	module.exports = homeService;
})();
