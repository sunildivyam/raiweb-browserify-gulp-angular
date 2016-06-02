'use strict';
/*
*	appHeaderService
*	Description
*	appHeaderService fetches the Application's Header Information.
*	This may include:
*	Logo, Menu items, Featured Links, Social media Links, Copyrights Information etc.
*/

(function() {
	var appHeaderService = function($q, $http) {
		var url = 'data/app-header.json';
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

	appHeaderService.$inject = ['$q', '$http'];
	module.exports = appHeaderService;
})();
