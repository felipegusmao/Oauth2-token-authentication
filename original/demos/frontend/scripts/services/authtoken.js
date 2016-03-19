'use strict';

angular.module('psJwtApp').factory('authToken', function($window) {
    var storage = $window.localStorage;
    var cachedToken;
    var userToken = 'userToken';
    var isAuthenticated = false;
    var authToken = {
        setToken: function(token) {
            cachedToken = token;
            storage.setItem(userToken, token);
            isAuthenticated = true;
        },
        getToken: function() {
            if (!cachedToken)
                cachedToken = storage.getItem(userToken);

            return cachedToken;
        },
        isAuthenticated: function() {
            return !!authToken.getToken();
        },
        removeToken: function() {
            cachedToken = null;
            storage.removeItem(userToken);
            isAuthenticated = false;
        }
    }

    return authToken;
});
