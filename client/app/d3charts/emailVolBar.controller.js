'use strict';

angular.module('gnittyApp')
  .controller('emailVolBarCtrl', ['$scope', '$http', 'Auth', function($scope, $http, Auth){

    // $scope.currentUser = Auth.getCurrentUser();
    // console.log($scope.currentUser);
    // $http.get('/api/stats/foruser/'+ $scope.currentUser._id).
    //   success(function(data) {
    //     $scope.statistics = data;
    //     }).success(function(){
    //   console.log($scope.statistics[0].keywords.length)
    // avg person received = 5,579 emails
    $scope.options = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 55
            },
            title: {
                enable: true,
                text: 'Emails Received'
            },
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            // showValues: true,
            valueFormat: function(d){
                return d3.format(',.0f')(d);
            },
            transitionDuration: 1000
            // xAxis: {
            //     axisLabel: ''
            // },
            // yAxis: {
            //     axisLabel: '',
            //     axisLabelDistance: 30
            // }
        }
    };

        $scope.data = [
            {
                key: "Cumulative Return",
                values: [
                    {
                        "label" : "You",
                        "value" : 3000
                    } ,
                    {
                        "label" : "Average American",
                        "value" : 5579
                    } ,
                    {
                        "label" : "John Oliver",
                        "value" : 13724
                    } ,
                    {
                        "label" : "Oprah",
                        "value" : 23000
                    }
                ]
            }
        ];

  }]);