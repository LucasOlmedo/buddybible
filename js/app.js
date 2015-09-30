// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('ionicons', ['ionic', 'jett.ionic.filter.bar', 'ionicons.controllers', 'ionicons.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicFilterBarConfigProvider) {
  // Turn off caching for demo simplicity's sake
  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.backButton.icon('ion-android-arrow-back');
  $ionicFilterBarConfigProvider.backdrop(false);

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('app.books', {
    url: '/books',
    views: {
      'menuContent': {
        templateUrl: 'templates/books.html',
        controller: 'BooksCtrl'
      }
    }
  })

  .state('app.book', {
      url: '/book',
      params : { book: null, chapter: null, verses: { array: true }},
      views: {
          'menuContent': {
              templateUrl: 'templates/book.html',
              controller: 'BookCtrl'
          }
      }
  })

  $urlRouterProvider.otherwise('/app/books');
});