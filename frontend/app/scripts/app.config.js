'use strict';

angular.module('site2App').config(function ($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: '/views/main.html'
            })
            .state('jobs', {
                url: '/jobs',
                templateUrl: '/views/jobs.html',
                controller: 'JobsCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/views/register.html',
                controller: 'RegisterCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/views/login.html',
                controller: 'LoginCtrl'
            })
            .state('logout', {
                url: '/logout',
                controller: 'LogoutCtrl'
            });

        $authProvider.loginUrl = API_URL + 'auth/login';
        $authProvider.signupUrl = API_URL + 'auth/register';
        $authProvider.google({
            clientId: '228009107288-plm3h23eggbc6ukq046b4fot82u4c2eb.apps.googleusercontent.com',
            url: API_URL + 'auth/facebook'
        });
        $authProvider.facebook({
            clientId: 'paste in the app id',
            url: API_URL + 'auth/google'
        });

        $httpProvider.interceptors.push('authInterceptor');
    })

    .constant('API_URL', 'http://localhost:1337/')

    .run(function ($window) {
        var params = $window.location.search.substring(1);
        if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
            var pair = params.split('=');
            var code = decodeURIComponent(pair[1]);

            $window.opener.postMessage(code, $window.location.origin);
        }
    });
