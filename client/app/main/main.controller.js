'use strict';

angular.module('gnittyApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    console.log($scope.getCurrentUser());

// Alchemy Notes:

// Calls to TextGetTextSentiment should be made using HTTP POST.
// HTTP POST calls should include the Content-Type header: application/x-www-form-urlencoded //?
// Posted text documents can be a maximum of 50 kilobytes. Larger documents will result in a "content-exceeds-size-limit" error response.

//Note - since our data is not from a public webpage, we have to actually upload it.

    $scope.postIt = function () {
      console.log('posting...');
      $http.post('/api/alchemy', {
        // 'http://access.alchemyapi.com/calls/text/TextGetTextSentiment', {
        // apikey: alchemy.apiKey,
        text: 'AGREEEDD! DAMN YOU CELEBRANTS OF COLUMBUS DAY!!!!!!!!!!! DAMN YOU TO HELL!!!!!! :-D',
        // text: 'msgText', //this comes from all gmail messages
        outputMode: 'json'
        }).success(function(returnedJSON) {
          $scope.results = returnedJSON;
          console.log($scope.results);
          // $scope.results.docSemtiment.type gives positive, neg, neutral
          // $scope.results.docSentiment.score gives strength of sentiment (0.0 is neutral)
        });
      $http.post('/api/alchemy/keywords', {
        text: 'AGREEEDD! DAMN YOU CELEBRANTS OF COLUMBUS DAY!!!!!!!!!!! DAMN YOU TO HELL!!!!!! :-D',
        outputMode: 'json'
      }).success(function(returnedJSON) {
          $scope.keywords = returnedJSON;
          console.log($scope.keywords);
        });
      $http.post('/api/alchemy/concepts', {
        text: 'AGREEEDD! DAMN YOU CELEBRANTS OF COLUMBUS DAY!!!!!!!!!!! DAMN YOU TO HELL!!!!!! :-D',
        outputMode: 'json'
      }).success(function(returnedJSON) {
          $scope.concepts = returnedJSON;
          console.log($scope.concepts);
        });
    };

    $scope.link = 'http://www.ginnabaker.com';
    $scope.clientObj = {};
    $scope.clientObj.phoneNum = '+1' + '5402557850';

    $scope.sendMMS = function() {
      $http.post('/api/twilio', {
        body: 'click for your report: '+$scope.link,
        to: $scope.clientObj.phoneNum,
        mediaUrl: 'http://i495.photobucket.com/albums/rr313/trtla/ist2_1050220-red-crayon-heart.jpg'
      }
      );
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });