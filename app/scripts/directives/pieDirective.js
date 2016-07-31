(function () {
  'use strict';
  angular.module('redmineStatisticApp')
    .directive('pie', function (settings, format) {
      return {
        restrict: 'E',
        scope: {
          done: '@'
        },
        template: `<div ><svg id="pie"></svg><span class="percent">{{percent}}</span></div>`,
        link: function (scope, element, attr) {
          var date = new Date();
          var month = date.getMonth() + 1;
          var curMonth = format(month);

          settings.getMonth(function (result) {
            scope.normTime = result.calendar['month_' + curMonth];
          });

          scope.$watch('done', function (val) {
            scope.done = val;

            var dataset = [scope.done * 1, scope.normTime * 1 - scope.done * 1];
            scope.percent = ((scope.done * 1 / scope.normTime * 1).toFixed(3) * 100).toFixed(1) + '%';
            console.log(scope.percent)
            var width = 300,
              height = 300,
              radius = Math.min(width, height) / 2;

            var color = ['#5ab74c', '#dadada'];

            var pie = d3.pie()
              .sort(null);

            var arc = d3.arc()
              .innerRadius(150)
              .outerRadius(70);

            var svg = d3.select("#pie")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            var path = svg.selectAll("path")
              .data(pie(dataset))
              .enter().append("path")
              .attr("fill", function (d, i) {
                return color[i];
              })
              .attr("d", arc);
          });

        }
      }
    });
})();