'use strict';

angular.module('site2App')
    .controller('LogoutCtrl', function ($auth, $state) {
        $auth.logout();
        $state.go('main');
    });
