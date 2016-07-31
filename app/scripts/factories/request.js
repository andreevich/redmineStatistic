(function () {
  'use strict';
  angular.module('redmineStatisticApp')
    .factory('request', function ($http, settings) {
      var resultData = [];
      var isNextRequest = false;

      function getLongData(urlParam) {
        var obj = angular.extend({}, urlParam, settings.getURL());
        var url = obj.link + '?spent_on=%3E%3C' + obj.dateFrom + '|' + obj.dateTo + '&user_id=me&offset=' + obj.offset + '&limit=' + obj.limit + '&key=' + obj.key;

        if (!isNextRequest) {
          resultData = [];
        }

        return $http({
          method: 'GET',
          url: url
        }).then(function successCallback(response) {
          resultData = resultData.concat(response.data.time_entries);

          if (response.data.time_entries.length == obj.limit) {
            isNextRequest = true;
            return getLongData(angular.extend(obj, {offset: obj.offset + obj.limit}))
          }
          else {
            isNextRequest = false;
            return resultData;
          }
        }, function errorCallback(response) {
          return response;
        });
      }
      return {
        get_old: function (urlParam) {
          return getLongData(urlParam);
        },
        get: function (){
          return $http.get('../fakeData/timeEntries.json').then(function(response){
            return response.data.time_entries;
          });
        }
      }
    });
})();