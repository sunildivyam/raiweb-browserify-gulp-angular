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
