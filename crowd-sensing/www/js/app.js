// Ionic Starter App

var bluetoothle;

var jqmReady = $.Deferred();
var pgReady = $.Deferred();

var app =
{
  callback: null,
  initialize: function(callback)
  {
    this.callback = callback;

    //If testing on a desktop, automatically resolve PhoneGap
    if (document.URL.match(/^https?:/) || document.URL.match(/^file:/))
    {
      pgReady.resolve();
    }
    //Else if on a mobile device, add event listener for deviceready
    else
    {
      document.addEventListener("deviceready", onDeviceReady, false);
    }
  }
};

$(document).on("pagecreate", function()
{
  //Resolve jQuery Mobile
  jqmReady.resolve();
  $(document).off("pagecreate");
});

$.when(jqmReady, pgReady).then(function()
{
  //When PhoneGap and jQuery Mobile are resolved, start the app
  if (app.callback !== null)
  {
    app.callback();
  }
});

function onDeviceReady()
{
  //Resolve PhoneGap after deviceready has fired
  pgReady.resolve();
}

app.initialize(

  // angular.module is a global place for creating, registering and retrieving Angular modules
  // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
  // the 2nd parameter is an array of 'requires'
  angular.module('starter', ['ionic'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }

      doYourJob();
    });
  })
);

var results = [];
var rawResults = [];

function doYourJob() {

  bluetoothle.initialize(function() {
    bluetoothle.startScan(function(scanResult) {
      if (scanResult.status == "scanStarted") {
        setTimeout(function() {
          bluetoothle.stopScan(function() { }, function(error) { alert("Couldn't stop scanning - " + JSON.stringify(error)) });
          alert("Found: " + JSON.stringify(results));
          alert("Counts: " + results.length + " pretty, " + rawResults.length + " raw" );
        }, 20000);
      } else if (scanResult.status == "scanResult") {
        var obj = { name: scanResult.name }
        if(scanResult.advertisement) {
          obj.ad = scanResult.advertisement;
          obj.decoded = bluetoothle.encodedStringToBytes(scanResult.advertisement);
        }
        results.push(obj);
      }
      rawResults.push(scanResult);
    }, function(error) {
      alert("Start scan failed - " + error.message);
    }, null);
  }, function(error){
    alert("Init failed :( - " + error.message);
  });
}
