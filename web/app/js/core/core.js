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
    .run(['$state', '$stateParams', '$rootScope', 'appHeaderService','pageTitleService', 'metaInformationService', '$location', 'stateHelperService',
        function($state, $stateParams, $rootScope, appHeaderService, pageTitleService, metaInformationService, $location, stateHelperService) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        /*
        *   assigns pageTitleService and metaInformationService to $rootScope
        *   so that both are available in the Head section of HTML page
        */

        $rootScope.pageTitleService = pageTitleService;
        $rootScope.metaInformationService = metaInformationService;

        /*
        *   Description
        *   All States configuration using $stateProviderRef, a reference to the $stateProvider service.
        *   All templates are loaded using $templateCache Service
        *   All States configurations are loaded dynamically using appHeaderService ($http) in JSON format
        */

        appHeaderService.getAppHeaderInfo().then(function(data) {
            if (data instanceof Object) {
                setAppHeader(data);
                // creates states and child states, as well as adds full stateNames to Navs
                stateHelperService.createStates($rootScope.appHeader.navs);

                if (data.application instanceof Object) {
                    setMetaInformation({
                        keywords: data.application.keywords,
                        description: data.application.description,
                        title: data.application.shortTitle
                    });
                } else {
                     setMetaInformation(); //resets meta information
                }
                //goto currentState or default state
                stateHelperService.loadCurrentOrDefaultState();
            } else {
                setMetaInformation();
                setAppHeader(false);
            }
        }, function() {
            setMetaInformation();
            setAppHeader(false);
        });



        /*
        *   setAppHeader is a private method
        *   It takes an Object param, and sets the various Header Information
        *   If param of anyother type is passed, it resets all the Header Information to null.
        *   So This method can be used to reset Header Information by passing false valueto param
        */
        function setAppHeader(headerInfo) {
            if (headerInfo instanceof Object) {
                $rootScope.appHeader = {
                    logo: headerInfo.logo || null,
                    navs: headerInfo.items || null
                };
            } else {
                $rootScope.appHeader = {
                    logo: null,
                    navs: null
                };
            }
        }

        /*
        *   setMetaInformation is a private method
        *   It takes an Object param, and sets the following meta Information of Page:
        *   keywords, description and page Title
        */
        function setMetaInformation(metaInfo) {
            if (metaInfo instanceof Object) {
                metaInformationService.reset();
                metaInformationService.appendMetaKeywords(metaInfo.keywords);
                metaInformationService.setMetaDescription(metaInfo.description);
                pageTitleService.setPageTitle(metaInfo.title);
            } else {
                metaInformationService.reset();
                pageTitleService.setPageTitle();
            }
        }
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
    .factory('technologiesService', require('./services/technologiesService'))
    .factory('appHeaderService', require('./services/appHeaderService'))
    .controller('appController', require('./controllers/appController'))
    .directive('appHeader', require('./directives/appHeader'))
    .directive('brandLogo', require('./directives/brandLogo'))
    .directive('bootstrapCarousel', require('./directives/bootstrapCarousel'));

    module.exports = angular.module('raiweb.core');
})();
