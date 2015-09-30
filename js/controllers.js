angular.module('ionicons.controllers', [])

.controller('AppCtrl', function($scope, $timeout, $ionicPopover, $location) {
  $scope.showPackExtensions = false;
  $scope.searching = false;

  $ionicPopover.fromTemplateUrl('mainPopover.html', {
      scope: $scope
  }).then(function(popover) {
      $scope.mainPopover = popover;
  });

  $scope.$on('$destroy', function() {
      $scope.mainPopover.remove();
  });

  $scope.closeMainPopover = function() {
      $scope.mainPopover.hide();
  };

  $scope.navigateTo = function(path){
      $scope.closeMainPopover();
      $location.path(path);
      // $state.go(path);
  }

  $scope.whatsActve = function(isItMe){
      // $state.href(path);
      return (isItMe === $location.path()) ? true : false ;
  }
})

.controller('BooksCtrl', function($scope, $rootScope, $ionicScrollDelegate, $timeout, $location, booksService) {
    var vm = this;
    $scope.previewingABook = false;
    $scope.$parent.hasNoShadow = false;
    $scope.books = [];

    booksService.all().then(
      function(books) {
          for (var i = 0; i < books.length; i++) {
            books[i].chapters = getChapters(books[i].chaptersCount);
            // console.log();
          };
          $scope.books = books;
          console.log('booklist returned to controller.');
      },
      function(data) {
          console.log('booklist retrieval failed.')
    });

    function getChapters(len){
      a = [];
      for (var i = 0; i < len; i++) {
          a.push(i);
      };
      return a;
    }

    $scope.openBook = function(id) {
      if(!$scope.books[id].open){
        $scope.lastPosition = $ionicScrollDelegate.getScrollPosition();
        $scope.previewingABook = true;
        $location.hash(id);
        $ionicScrollDelegate.$getByHandle('mainScroll').anchorScroll(true);
        $ionicScrollDelegate.freezeAllScrolls(true);
        $scope.books[id].open = true;
        $scope.openedBook = id;
      }        
    }

    $scope.closeBook = function(){ 
      $scope.previewingABook = false;     
      $scope.books[$scope.openedBook].open = false;
      $ionicScrollDelegate.freezeAllScrolls(false);
      $ionicScrollDelegate.scrollTo($scope.lastPosition.left, $scope.lastPosition.top, false)
    }
})

.controller('BookCtrl', function($scope, $sce, $timeout, $rootScope, $stateParams, $ionicSlideBoxDelegate, booksService){
  var theBook = $stateParams.book.replace(/\s+/g, '');
  var vm = this;
  $scope.book = {};
  $scope.$parent.hasNoShadow = false;
  $scope.book.name = $stateParams.book;
  // $scope.chapter = $stateParams.chapter;
  $scope.chapter = 1;
  $scope.chaptersArray = [0];

  booksService.view(theBook).then(
    function(data) {
        vm.getArray(data.length);
        $scope.book.chapters = data;
    },
    function(data) {
        console.log('book retrieval failed.')
  });

  $scope.to_trusted = function(html_code) {
    return $sce.trustAsHtml(html_code);
  };

  vm.getArray = function(len){
    for (var i = 0; i < len; i++) {
      if (i > 0) {
        $scope.chaptersArray.push(i);
        $ionicSlideBoxDelegate.update();
      }else if(i == len-1){
        $scope.activeSlide = $scope.chapter;
        // vm.goToSlide($scope.chapter,0);
      }
    };
    console.log($scope.chaptersArray);
  }
  $scope.slideChanged = function(index){
    $scope.chapter = index + 1;
  }

  vm.goToSlide = function(index, time){
      if (!time)
        time = 500;
      $ionicSlideBoxDelegate.slide(index, time);
  }
})

.controller('SettingsCtrl', function($scope) {
  $scope.$parent.hasNoShadow = false;
});
