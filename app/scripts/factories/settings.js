(function () {
  'use strict';
  angular.module('redmineStatisticApp')
    .factory('settings', function () {
      return {
        getURL: function () {
          return this.getRedmine();
        },
        initCalendar: function () {
          chrome.storage.local.get('calendar', function (result) {
            if (!result.calendar) {
              var tempCalendar = {
                month_01: 172,
                month_02: 172,
                month_03: 172,
                month_04: 172,
                month_05: 172,
                month_06: 172,
                month_07: 172,
                month_08: 172,
                month_09: 172,
                month_10: 172,
                month_11: 172,
                month_12: 172
              };
              chrome.storage.local.set({calendar: tempCalendar});
            }
          });
        },
        getCalendar: function (callback) {
          this.initCalendar();
          chrome.storage.local.get('calendar', callback);
        },
        initRedmine: function () {
          chrome.storage.local.get('redmine', function (result) {
            if (!result.redmine) {
              var tempRedmine = {
                link: 'https://redmine.site.com/time_entries.json',
                key: 'fXXXXXXXXX2'
              };
              chrome.storage.local.set({'redmine': tempRedmine});
            }
          })
        },
        getRedmine: function (callback) {
          this.initRedmine();
          chrome.storage.local.get('redmine', callback);
        },
        getMonth: function (callback) {
          this.initCalendar();
          chrome.storage.local.get('calendar', callback);
        },
        setCalendar: function (calendar) {
          if (calendar) {
            var intCalendar = angular.extend(calendar);
            for (var month in intCalendar) {
              intCalendar[month] = intCalendar[month] * 1;
            }
            chrome.storage.local.set({calendar: intCalendar});
          }
        },
        setRedmine: function (redmine) {
          if (redmine) {
            var itempRedmine = angular.extend(redmine);
            chrome.storage.local.set({'redmine': itempRedmine});
          }
        }
      }
    })
    .factory('format', function (){
      return function(value){
        return  value < 10 ? '0' + value : value;
      }
    });
})();