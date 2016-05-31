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
		$locationProvider.html5Mode(true);

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
			url: '/',
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

	var appService = require('./services/appService');
	var pageTitleService = require('./services/pageTitleService');
	var metaInformationService = require('./services/metaInformationService');
	var appController = require('./controllers/appController');
	var appHeader = require('./directives/appHeader');

	angular.module('raiweb.core')
	.factory(appService.name, appService)
	.factory(pageTitleService.name, pageTitleService)
	.factory(metaInformationService.name, metaInformationService)
	.controller(appController.name, appController)
	.directive(appHeader.name, appHeader);

	module.exports = angular.module('raiweb.core');
})();