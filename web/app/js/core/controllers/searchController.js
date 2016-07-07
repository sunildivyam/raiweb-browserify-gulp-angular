'use strict';
/*
*   searchController
*   Description
*   searchController handles the search Functionality.
*/

(function() {
    var searchController = function($rootScope, $scope, searchService) {
        var featureName = 'All';
        $scope.searchKeywords;
        $scope.foundFeatures;

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
            if (toParams) {

                // Ensures keywords Param decoding and disallow double encoding of space and % characters in Params
                $rootScope.$state.go('.', {
                    keywords: decodeURI(toParams.keywords)
                },
                {
                    reload: false,
                    notify: false
                });

                $scope.searchKeywords = decodeURI(toParams.keywords);
                searchService.searchFeatures($scope.searchKeywords, featureName).then(function(features) {
                    $scope.foundFeatures = features;
                });
            }
        });
    };

    searchController.$inject = ['$rootScope', '$scope', 'searchService'];
    module.exports = searchController;
})();
