'use strict';
/**
 * @ngdoc directive
 * @name pfoexp.core:appFooter
 * @element Any
 * @function
 *
 * @description
 * appFooter directive is responsible for loading and painting Application Header
 * from its Html template
 * This may include:
 * Logo, Menu items, Featured Links, Social media Links, Copyrights Information etc.
 */

(function() {
    var appFooter = function($rootScope, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                logo: '=',
                services: '=',
                articles: '=',
                technologies: '=',
                socialMediaLinks: '=',
                credits: '@',
                copyrightsText: '@'
            },
            templateUrl: 'core/app-footer.html',
            link: function($scope) {

            }
        };
    };

    appFooter.$inject = ['$rootScope', '$timeout'];
    module.exports = appFooter;
})();
