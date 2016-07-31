(function () {
  'use strict';
  angular.module('redmineStatisticApp')
    .factory('timeLine', function () {
      return {
        date: function (data) {
          var result = [];
          var groupData = _.groupBy(data, 'spent_on');
          _.forIn(groupData, function (key, value) {
            var workTime = 0;


            key.map(function (item) {
              workTime += item.hours;
            });

            result.push({
              date: value,
              tasks: key.length,
              time: workTime
            });
          });

          result.sort(function (a, b) {
            return a.date.localeCompare(b.date);
          });
          var maxTime = 0;

          result.map(function (item) {
            if (item.time > maxTime) {
              maxTime = item.time;
            }
          });
          result.map(function (item) {
            item.maxTime = maxTime;
          });
          return result;
        }
      }
    });
})();