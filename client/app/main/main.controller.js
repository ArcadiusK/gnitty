'use strict';

angular.module('gnittyApp')
  .controller('MainCtrl', function ($scope, $http, Auth, gAPI, postAlchemy) {
    console.log(postAlchemy);
    $scope.getCurrentUser = Auth.getCurrentUser;
    // initialize google api in case already signed in, etc. TODO: fix this
    // gAPI.handleClientLoad();

    // Scope wires together ng-click login call to google API service
    // gAPI.login() returns a promise which resolves with .then()
    // data returned currently contains an email property with user's address
    $scope.login = function() {
      gAPI.login().then(
        function (data) { console.log( 'your address is ' + data.email ); },
        function (err) { console.log( 'Failed: ' + err ); }
      );
    };

    // checkAuth
    $scope.checkAuth = function() {
      gAPI.checkAuth();
    };

    $scope.allEmailBodies = 'AGREEEDD! DAMN YOU CELEBRANTS OF COLUMBUS DAY!!!!!!!!!!! DAMN YOU TO HELL!!!!!! :-D';

    $scope.postIt = function () {
      postAlchemy.sendToAlchemy($scope.allEmailBodies, function(analysis) {
        console.log(analysis);
        var save = function(analysis) {
          $http.post('/api/stats', {
            user: {
              _id: $scope.getCurrentUser()._id
            },
            concepts: analysis.concepts,
            keywords: analysis.keywords,
            sentiment: analysis.sentiment
          });
        };
        save(analysis);
        console.log('saving...')
      });
    };

    $scope.link = 'http://www.ginnabaker.com';
    $scope.clientObj = {};
    $scope.clientObj.phoneNum = '+1' + '5402557850';
    $scope.mediaUrl = 'http://i495.photobucket.com/albums/rr313/trtla/ist2_1050220-red-crayon-heart.jpg';

    $scope.sendMMS = function() {
      $http.post('/api/twilio', {
        body: 'click for your report: '+$scope.link,
        to: $scope.clientObj.phoneNum,
        mediaUrl: $scope.mediaUrl
      });
    };

  });
