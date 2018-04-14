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

  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html',
      }
    }
  })

  .state('app.books', {
    url: '/books',
    views: {
      'menuContent': {
        templateUrl: 'templates/books.html',
        controller: 'BooksCtrl'
      },
      'fabContent': {
          template: '<button id="fab-order" class="button button-fab button-fab-bottom-right drop limes" style="display:none" ng-class="turnOn" data-ink-color="#E2EC91" data-ink-opacity=".8" ng-click="newTask()"><i class="icon ion-plus"></i></button>',
          controller: 'BooksCtrl'
      }
    }
  })

  .state('app.book', {
      url: '/book',
      params : { book: null },
      views: {
          'menuContent': {
              templateUrl: 'templates/book.html',
              controller: 'BookCtrl'
          },
          'fabContent': {
              template: '<button id="fab-dialpad" class="button button-fab button-fab-bottom-right on spin orange" ng-clas="turnOn" data-ink-color="#E2EC91" data-ink-opacity=".8" ng-show="!showDialpad" ng-click="toggleDialpad()"><i class="zmdi icon zmdi-dialpad"></i></button>',
              controller: 'BookCtrl'
          }
      }
  })

  $urlRouterProvider.otherwise('/app/books');
});