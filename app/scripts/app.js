(function () {
  'use strict';
  angular.module('redmineStatisticApp', ['ui.router'])
    .controller('commonCtrl', function ($rootScope, $scope, $http, timeLine, request, settings, format) {

      var date = new Date();
      var curMonth = date.getMonth() + 1;
      var nextMonth = date.getMonth() + 2;

      var curMonthFormated = format(curMonth);
      var nexMonthFormated = format(nextMonth);


      $scope.urlParam = {
        dateFrom: date.getFullYear() + '-' + curMonthFormated + '-01',
        dateTo: date.getFullYear() + '-' + nexMonthFormated + '-01',
        offset: 0,
        limit: 100
      };
      console.log($scope.urlParam);

      $scope.getData = function () {
        $scope.data = [];
        $scope.allTime = 0;
        request.get($scope.urlParam)
          .then(function successCallback(response) {
            $scope.data = timeLine.date(response);
            $scope.data.map(function (item) {
              $scope.allTime += item.time;
            });
            $scope.allTime = $scope.allTime.toFixed(2);
          }, function errorCallback(response) {
            console.log(response);
            $scope.errorData = response;
          });
      };

      $scope.update = function () {
        $scope.getData();
      };

      $scope.init = function () {
        $scope.getData();
      };

      $scope.init();

    })
    .controller('settingsCtrl', function ($scope, settings) {

      settings.getCalendar(function (result) {
        $scope.calendar = result.calendar;
      });

      settings.getRedmine(function (result) {
        $scope.redmine = result.redmine;
      });

      $scope.$watch(function () {
        return $scope.calendar;
      }, function (val) {
        settings.setCalendar(val);
      }, true);

      $scope.$watch(function () {
        return $scope.redmine;
      }, function (val) {
        settings.setRedmine(val);
      }, true);
    })
    .config(function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/state1");
      $stateProvider
        .state('state1', {
          url: "/state1",
          templateUrl: "../views/redmineStatisticView.html",
          controller: 'commonCtrl'
        })
        .state('state2', {
          url: "/state2",
          templateUrl: "../views/settingsView.html",
          controller: 'settingsCtrl'
        })
    });
})();