'use strict';

angular.module('psJwtApp')
	.controller('LogoutCtrl', function ($auth, $state) {
		$auth.logout();
		$state.go('main');
	});