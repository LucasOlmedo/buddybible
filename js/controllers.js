angular.module('ionicons.controllers', [])

.controller('AppCtrl', function($scope, $timeout, $ionicPopover, $location) {
  $scope.showPackExtensions = false;
  $scope.searching = false;
  $scope.showDialpad = false;

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

  $scope.toggleDialpad = function(){
    $scope.showDialpad = !$scope.showDialpad;
  };
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
  $scope.chapter = $stateParams.chapter;
  $scope.chaptersArray = [0]
  $scope.chapter = 1;

  $timeout(function(){
    // $scope.$parent.showDialpad = false;
    $scope.turnOn = 'on';
  },500);

  // $scope.toggleDialpad = function(){
    // $scope.$parent.showDialpad = true;
  // };

  // var theBook = $scope.book.replace(/\s+/g, '');
  booksService.view(theBook).then(
    function(data) {
        $scope.book.chapters = data;
        $scope.chaptersCount = data.length;
        // if (data.length > 4)
        //   vm.getArray(3);
        // else
          vm.getArray(data.length);

        // console.log('book returned to controller.');
        // vm.goToSlide(2, 0);
    },
    function(data) {
        console.log('book retrieval failed.')
  });

  $scope.to_trusted = function(html_code) {
    return $sce.trustAsHtml(html_code);
  };

  vm.getArray = function(len, updating){
    if(!updating){
      $scope.chaptersArray = [];
      for (var i = 0; i < len; i++) {
        $scope.chaptersArray.push($scope.chaptersArray.length);
        $ionicSlideBoxDelegate.update();
      }
    }
    else if(updating){
      $scope.chaptersArray.push($scope.chaptersArray.length);
      $ionicSlideBoxDelegate.update();
    }
  }
  $scope.slideChanged = function(index){
    $scope.chapter = index + 1;
    // if($scope.chaptersArray.length <= $scope.chaptersCount)
    //   vm.getArray($scope.chaptersCount, true);
  }

  vm.goToSlide = function(index, time){
      if (!time)
        time = 500;
      $ionicSlideBoxDelegate.slide(index, time);
  }

  $scope.goToSlide = function(index, time){
      $scope.chapter;
      $ionicSlideBoxDelegate.slide(index);
      $scope.$parent.showDialpad = false;
  }
})

.controller('SettingsCtrl', function($scope) {
  $scope.$parent.hasNoShadow = false;
});
