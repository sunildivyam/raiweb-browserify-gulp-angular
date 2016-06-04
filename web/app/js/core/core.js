'use strict';
(function() {
	/**
	*  	raiweb.core Module
	* 	Description
	*	This module is the base module for the application and has States configurations
	*	and other core level configurations if any
	*/

	angular.module('raiweb.core', [])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
		// Any invalid Url will redirect to "/home" url
		$urlRouterProvider.otherwise('/home');

		// Enables html5Mode Urls
		$locationProvider.html5Mode({
			enabled: false,
			requireBase: false
		});

		/*
		*	Description
		*	All States configuration using $stateProvider.
		*	All templates are loaded using $templateCache Service
		*	The 1st Level States are:
		* 	home
		* 	services
		* 	portfolio
		* 	aboutus
		* 	contactus
		* 	team
		* 	articles
		*/

		$stateProvider.state({
			name: 'home',
			url: '/home',
			templateProvider: ['$templateCache', function($templateCache) {
				return $templateCache.get('home/landing.html');
			}],
			controller: 'homeController'
		})
		.state({
			name: 'services',
			url: '/services',
			templateProvider: ['$templateCache', function($templateCache) {
				return $templateCache.get('services/landing.html');
			}],
			controller: 'servicesController'
		})
		.state({
			name: 'portfolio',
			url: '/portfolio',
			templateProvider: ['$templateCache', function($templateCache) {
				return $templateCache.get('portfolio/landing.html');
			}],
			controller: 'portfolioController'
		})
		.state({
			name: 'aboutus',
			url: '/how-we-work',
			templateProvider: ['$templateCache', function($templateCache) {
				return $templateCache.get('aboutus/landing.html');
			}],
			controller: 'aboutusController'
		})
		.state({
			name: 'contactus',
			url: '/contact-us',
			templateProvider: ['$templateCache', function($templateCache) {
				return $templateCache.get('contactus/landing.html');
			}],
			controller: 'contactusController'
		})
		.state({
			name: 'team',
			url: '/team',
			templateProvider: ['$templateCache', function($templateCache) {
				return $templateCache.get('team/landing.html');
			}],
			controller: 'teamController'
		})
		.state({
			name: 'articles',
			url: '/articles',
			templateProvider: ['$templateCache', function($templateCache) {
				return $templateCache.get('articles/landing.html');
			}],
			controller: 'articlesController'
		});
	}])
	/*
	*	Description
	*	Run method of core module, makes the $state and $stateParams Service, available
	*	to the $rootScope Service
	*/
	.run(['$state', '$stateParams', '$rootScope', function($state, $stateParams, $rootScope) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
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
