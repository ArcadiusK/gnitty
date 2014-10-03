'use strict';

angular.module('gnittyApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });

var CLIENT_ID = '626085391000-vbd4dkua39odasb6sjrq0tn3es8uboet.apps.googleusercontent.com';
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
var USER = 'me';

/**
 * Called when the client library is loaded to start the auth flow.
 */
function handleClientLoad() {
  window.setTimeout(checkAuth, 1);
}

/**
 * Check if the current user has authorized the application.
 */
function checkAuth() {
  gapi.auth.authorize(
      {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': true},
      handleAuthResult);
}

/**
 * Called when authorization server replies.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authButton = document.getElementById('authorizeButton');
  var outputNotice = document.getElementById('notice');
  authButton.style.display = 'none';
  outputNotice.style.display = 'block';
  if (authResult && !authResult.error) {
    // Access token has been successfully retrieved, requests can be sent to the API.
    gapi.client.load('gmail', 'v1', function() {
      listThreads(USER, function(resp) {
        var threads = resp.threads;
        console.log(threads);
        for (var i = 0; i < threads.length; i++) {
          var thread = threads[i];
          console.log(i);
          console.log(thread);
          console.log(thread['id']);
        }
      });
    });
  } else {
    // No access token could be retrieved, show the button to start the authorization flow.
    authButton.style.display = 'block';
    outputNotice.style.display = 'none';
    authButton.onclick = function() {
        gapi.auth.authorize(
            {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': false},
            handleAuthResult);
    };
  }
}

/**
 * Get a page of Threads.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {Function} callback Function called when request is complete.
 */
function listThreads(userId, callback) {
  var request = gapi.client.gmail.users.threads.list({
    'userId': userId
  });
  request.execute(callback);
}