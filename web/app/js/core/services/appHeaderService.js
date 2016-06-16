'use strict';
/*
*	appHeaderService
*	Description
*	appHeaderService fetches the Application's Header Information.
*	This may include:
*	Logo, Menu items, Featured Links, Social media Links, Copyrights Information etc.
*/

(function() {
	var appHeaderService = function($q, appService) {
		var url = 'data/app-header.json';

		function getAppHeaderInfo() {
			return appService.requestData(url);
		}

		function getMainCarousel() {
			var defferedObj = $q.defer();
			appService.requestData(url).then(function(appHeaderInfo) {
				defferedObj.resolve(appHeaderInfo && appHeaderInfo.mainCarousel);
			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		function getNavs() {
			var defferedObj = $q.defer();
			appService.requestData(url).then(function(appHeaderInfo) {
				defferedObj.resolve(appHeaderInfo && appHeaderInfo.navs);
			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		function getApplication() {
			var defferedObj = $q.defer();
			appService.requestData(url).then(function(appHeaderInfo) {
				defferedObj.resolve(appHeaderInfo && appHeaderInfo.application);
			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		function getLogo() {
			var defferedObj = $q.defer();
			appService.requestData(url).then(function(appHeaderInfo) {
				defferedObj.resolve(appHeaderInfo && appHeaderInfo.logo);
			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		return {
			getAppHeaderInfo: getAppHeaderInfo,
			getMainCarousel: getMainCarousel,
			getNavs: getNavs,
			getApplication: getApplication,
			getLogo: getLogo
		};
	};

	appHeaderService.$inject = ['$q', 'appService'];
	module.exports = appHeaderService;
})();
