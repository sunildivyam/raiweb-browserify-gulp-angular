'use strict';
(function() {
    /**
    *   raiweb.core Module
    *   Description
    *   This module is the base module for the application and has States configurations
    *   and other core level configurations if any
    */

    /*  This is $stateProviderRef variable and is used to create All States Dynamically
    *   from appHeaderService fetched nav data
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
    *   Description
    *   Run method of core module, makes the $state and $stateParams Service, available
    *   to the $rootScope Service
    */
    .run(['$state', '$stateParams', '$rootScope', 'appHeaderService','pageTitleService', 'metaInformationService',
        function($state, $stateParams, $rootScope, appHeaderService, pageTitleService, metaInformationService) {
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
                createStates($rootScope.appHeader.navs);
                if (data.application instanceof Object) {
                    setMetaInformation({
                        keywords: data.application.keywords,
                        description: data.application.description,
                        title: data.application.shortTitle
                    });
                } else {
                     setMetaInformation(); //resets meta information
                }
            } else {
                setMetaInformation();
                setAppHeader(false);
            }
        }, function() {
            setMetaInformation();
            setAppHeader(false);
        });

        /*
        *   createStates is a private method
        *   Description:
        *   createStates method is a recursive method, which recursively iterates through the navs tree and
        *   creates the corresponding states.
        */
        function createStates(navs, parentStateName) {
            if (!(navs instanceof Array)) {
                return;
            }

            navs.filter(function(navItem) {
                var stateName = parentStateName ? parentStateName + '.' + navItem.id : navItem.id;
                /*  pushes full stateName into the navItem of the navs Array.
                *   So that this can be available to header template
                */
                navItem.stateName = stateName;
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
                    navs: headerInfo.navs || null
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
