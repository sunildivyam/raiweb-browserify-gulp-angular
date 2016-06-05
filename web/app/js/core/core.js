'use strict';
(function() {
	/**
	*  	raiweb.core Module
	* 	Description
	*	This module is the base module for the application and has States configurations
	*	and other core level configurations if any
	*/

	/* 	This is $stateProviderRef variable and is used to create All States Dynamically
	*	from appHeaderService fetched nav data
	*/
	var $stateProviderRef;

	angular.module('raiweb.core', [])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
		$stateProviderRef = $stateProvider;
		// Any invalid Url will redirect to "/home" url
		$urlRouterProvider.otherwise('/home');

		// Enables html5Mode Urls
		$locationProvider.html5Mode({
			enabled: false,
			requireBase: false
		});


	}])
	/*
	*	Description
	*	Run method of core module, makes the $state and $stateParams Service, available
	*	to the $rootScope Service
	*/
	.run(['$state', '$stateParams', '$rootScope', 'appHeaderService', function($state, $stateParams, $rootScope, appHeaderService) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;

		/*
		*	Description
		*	All States configuration using $stateProviderRef, a reference to the $stateProvider service.
		*	All templates are loaded using $templateCache Service
		*	All States configurations are loaded dynamically using appHeaderService ($http) in JSON format
		*/

		appHeaderService.getAppHeaderInfo().then(function(data) {
			var navs = data && data.navs;
			createStates(navs);
		}, function() {

		});

		/*
		*	createStates is a private method
		*	Description:
		*	createStates method is a recursive method, which recursively iterates through the navs tree and
		*	creates the corresponding states.
		*/
		function createStates(navs, parentStateName) {
			if (!(navs instanceof Array)) {
				return;
			}

			navs.filter(function(navItem) {
				var stateName = parentStateName ? parentStateName + '.' + navItem.id : navItem.id;
				var state = {
					name: stateName,
					url: '/' + navItem.id,
					templateProvider: ['$templateCache', function($templateCache) {
						return $templateCache.get(navItem.templateUrl);
					}]
				};

				if (navItem.controllerName) {
					state.controller = navItem.controllerName;
				}

				$stateProviderRef.state(state);
				createStates(navItem.navs, stateName);
			});
		}
	}]);

	/*
	*	Description
	*	All Core module's
	*	Services
	*	Controllers
	*	Directives
	*	filters
	*	Providers etc.
	*	should be required here and defined in raiweb.core module
	*/

	angular.module('raiweb.core')
	.factory('responsiveDetectionService', require('./services/responsiveDetectionService'))
	.factory('appService', require('./services/appService'))
	.factory('pageTitleService', require('./services/pageTitleService'))
	.factory('metaInformationService', require('./services/metaInformationService'))
	.factory('appHeaderService', require('./services/appHeaderService'))
	.controller('appController', require('./controllers/appController'))
	.directive('appHeader', require('./directives/appHeader'))
	.directive('brandLogo', require('./directives/brandLogo'));

	module.exports = angular.module('raiweb.core');
})();
