'use strict';
/*
*   requestInterceptor
*   Description
*   requestInterceptor intercepts are responses and error responses and
*   redirects to respective Error Pages
*/

(function() {
    var requestInterceptor = function($rootScope) {
        var ERRORS = [404, 400, 500, 403, 401];

        function request(config) {
            // do something on success
            return config;
        }

        function requestError(rejection) {
            return rejection;
        }

        function response(response) {
            redirectOnError(response);
            return response;
        }

        function responseError(rejection) {
            redirectOnError(rejection);
            return rejection;
        }

        function redirectOnError(res) {
            var isError = false;
            ERRORS.filter(function(error) {
                if (error === res.status) {
                    isError = true;
                    return;
                }
            });

            if(isError === true) {
                $rootScope.errorState = {
                    'status': res.status,
                    'statusText': res.statusText
                };
                //window.location.pathname = '/error';
                $rootScope.$state.go('error');
            } else {
                $rootScope.errorState = {
                    'status': null,
                    'statusText': null
                };
            }
        }

        return {
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError
        };
    };

    requestInterceptor.$inject = ['$rootScope'];
    module.exports = requestInterceptor;
})();
