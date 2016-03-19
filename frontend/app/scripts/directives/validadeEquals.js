'use strict';


angular.module('site2App')
  .directive('validadeEquals', function () {
    return {
        require: 'ngModel',
        link: function(scope,element,attrs,ngModelCtrl) {
            function validadeEqual(value) {
                var valid = (value === scope.$eval(attrs.validadeEquals));
                ngModelCtrl.$setValidity('equal', valid);
                return valid ? value : undefined;
            }
            ngModelCtrl.$parsers.push(validadeEqual);
            ngModelCtrl.$formatters.push(validadeEqual);

            scope.$watch(attrs.validadeEquals, function () {
                ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
            });
        }
    };
  });
