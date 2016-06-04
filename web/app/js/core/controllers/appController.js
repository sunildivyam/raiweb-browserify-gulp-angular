'use strict';
/*
*   appController
*   Description
*   appController controls the Application Level Scope Data.
*/

(function() {
    var appController = function($rootScope, $scope, $window, pageTitleService, metaInformationService, appHeaderService, responsiveDetectionService) {
        // sets the currentBreakpoint on page Load.
        setCurrentBreakpoint();

        /*
        *   assigns pageTitleService and metaInformationService to $rootScope
        *   so that both are available in the Head section of HTML page
        */

        $rootScope.pageTitleService = pageTitleService;
        $rootScope.metaInformationService = metaInformationService;

        // fetches the Application Header information
        appHeaderService.getAppHeaderInfo().then(function(data) {
            setAppHeader(data);
            setMetaInformation({
                keywords: data.application.keywords,
                description: data.application.description,
                title: data.application.shortTitle
            });
        }, function() {
            setAppHeader(false);    // resets the Header Information
        });

        /*
        *   setAppHeader is a private method
        *   It takes an Object param, and sets the various Header Information
        *   If param of anyother type is passed, it resets all the Header Information to null.
        *   So This method can be used to reset Header Information by passing false valueto param
        */
        function setAppHeader(headerInfo) {
            if (headerInfo instanceof Object) {
                $scope.appHeader = {
                    logo: headerInfo.logo || null,
                    navs: headerInfo.navs || null
                };
            } else {
                $scope.appHeader = {
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

        function setCurrentBreakpoint() {
            $rootScope.currentBreakpoint = responsiveDetectionService.getCurrentBreakpoint();
            if (!$rootScope.$$phase) {
                $rootScope.$apply();
            }
        }
        /*
        *   Window Resize handler to identify current Bootstrao breakpoint
        *   to make it available throughout Application, assigns to $rootScope
        */
        angular.element($window).bind('resize', function() {
            setCurrentBreakpoint();
        });
    };

    appController.$inject = ['$rootScope', '$scope', '$window' ,'pageTitleService', 'metaInformationService', 'appHeaderService', 'responsiveDetectionService'];
    module.exports = appController;
})();
