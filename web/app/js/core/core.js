'use strict';
(function() {
    /**
    *   raiweb.core Module
    *   Description
    *   This module is the base module for the application and has States configurations
    *   and other core level configurations if any
    */

    angular.module('raiweb.core', [])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        // Error Page State Definition. All other states are created in Run section of this module
        $stateProvider.state({
            name: 'error',
            url: '/error',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('core/error.html');
            }]
        })
        .state({
            name: 'search',
            url: 'search?keywords',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('core/search-landing.html');
            }]
        });
        /*  This is window.$stateProviderRef variable and is used to create All States Dynamically
        *   from appHeaderService fetched nav data
        */
        window.$stateProviderRef = $stateProvider;
        // Enables html5Mode Urls
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

        $httpProvider.interceptors.push('requestInterceptor');
    }])
    /*
    *   Description
    *   Run method of core module, makes the $state and $stateParams Service, available
    *   to the $rootScope Service
    */
    .run(['$state', '$stateParams', '$rootScope', 'appHeaderService','pageTitleService',
        'metaInformationService', '$location', 'stateHelperService', '$q', 'servicesService', 'articlesService',
        function($state, $stateParams, $rootScope, appHeaderService, pageTitleService,
        metaInformationService, $location, stateHelperService, $q, servicesService, articlesService) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        /*
        *   assigns pageTitleService and metaInformationService to $rootScope
        *   so that both are available in the Head section of HTML page
        */

        $rootScope.pageTitleService = pageTitleService;
        $rootScope.metaInformationService = metaInformationService;

        function configureServices(services) {
            if (services instanceof Array) {
                var parentStateName = 'services';
                stateHelperService.createStates(services, parentStateName);
            }
        }

        function configureArticles(articles) {
            if (articles instanceof Array) {
                var parentStateName = 'articles';
                stateHelperService.createStates(articles, parentStateName);
            }
        }

        /*
        *   configureAppHeader is a private method
        *   It takes an Object param, and sets the various Header Information
        *   If param of anyother type is passed, it resets all the Header Information to null.
        *   So This method can be used to reset Header Information by passing false valueto param
        */
        function configureAppHeader(headerInfo) {
            if (headerInfo instanceof Object) {
                $rootScope.appHeader = {
                    application: headerInfo.application || null,
                    logo: headerInfo.logo || null,
                    navs: headerInfo.items || null
                };
            } else {
                $rootScope.appHeader = {
                    application: null,
                    logo: null,
                    navs: null
                };
            }

            stateHelperService.createStates($rootScope.appHeader.navs);
            setMetaInformation(); //resets meta information
        }

        /*
        *   setMetaInformation is a private method
        *   It takes an Object param, and sets the following meta Information of Page:
        *   keywords, description and page Title
        */
        function setMetaInformation() {
            metaInformationService.reset();
            pageTitleService.setPageTitle();
        }

        appHeaderService.getAppHeaderInfo().then(function(headerInfo) {
            configureAppHeader(headerInfo);

            var servicesPromise = servicesService.getAllServices().then(function(services) {
                configureServices(services);
            }, function() {
                configureServices();
            });

            var articlesPromise = articlesService.getAllArticles().then(function(articles) {
                configureArticles(articles);
            }, function() {
                configureArticles();
            });

            $q.all(servicesPromise, articlesPromise).then(function() {
                //goto currentState or default state
                stateHelperService.loadCurrentOrDefaultState();
            }, function() {
                //goto currentState or default state
                stateHelperService.loadCurrentOrDefaultState();
            });
        }, function() {
            configureAppHeader();
        });
    }]);

    /*
    *   Description
    *   All Core module's
    *   Services
    *   Controllers
    *   Directives
    *   filters
    *   Providers etc.
    *   should be required here and defined in raiweb.core module
    */

    angular.module('raiweb.core')
    .factory('requestInterceptor', require('./services/requestInterceptor'))
    .factory('responsiveDetectionService', require('./services/responsiveDetectionService'))
    .factory('stateHelperService', require('./services/stateHelperService'))
    .factory('appService', require('./services/appService'))
    .factory('pageTitleService', require('./services/pageTitleService'))
    .factory('metaInformationService', require('./services/metaInformationService'))
    .factory('servicesService', require('./services/servicesService'))
    .factory('articlesService', require('./services/articlesService'))
    .factory('technologiesService', require('./services/technologiesService'))
    .factory('appHeaderService', require('./services/appHeaderService'))
    .controller('appController', require('./controllers/appController'))
    .directive('appHeader', require('./directives/appHeader'))
    .directive('brandLogo', require('./directives/brandLogo'))
    .directive('featureList', require('./directives/featureList'))
    .directive('bootstrapCarousel', require('./directives/bootstrapCarousel'))
    .directive('tags', require('./directives/tags'))
    .directive('globalSearch', require('./directives/globalSearch'));

    module.exports = angular.module('raiweb.core');
})();
