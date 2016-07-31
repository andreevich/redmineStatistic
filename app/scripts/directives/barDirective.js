(function () {
  'use strict';
  angular.module('redmineStatisticApp')
    .directive('bar', function () {
      return {
        restrict: 'E',
        scope: {
          item: '@'
        },
        template: `
        <div class='bar-wrapper'>
          <div class="reference-hour"></div>
          <div class='bar'></div>
        </div>`,
        link: function (scope, element) {
          var item = JSON.parse(scope.item);
          var $bar = $(element).find('.bar');
          var etalonWidth = (100*8/item.maxTime).toFixed(1);
          scope.size = item.time;

          $bar.parent().find('.reference-hour').width(etalonWidth+'%');

          var percent = (item.time / 8 * 100 * etalonWidth/100).toFixed(1);
          $bar.width(percent + '%');
          if (item.time < 8) {
            $bar.addClass('partial');
          }
          if (item.time > 8) {
            $bar.addClass('over');
          }
          if (item.time == 8) {
            $bar.addClass('full');
          }

        }
      }
    });
})();