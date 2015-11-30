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
})

.controller('BooksCtrl', function($scope, $rootScope, $ionicScrollDelegate, $ionicFilterBar, $timeout, $location, booksService) {
    var vm = this;
    $scope.previewingABook = false;
    $scope.$parent.hasNoShadow = false;
    $scope.books = [];
    $scope.viewStyle = 'list';
    $scope.emptyContent = false;

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

    $scope.search = function (){
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.books,
        done: function () {
          $scope.searching = true;
        },
        update: function (filteredItems) {
            if (filteredItems.length < 1) {
              $scope.emptyContent = true;
            }else{
              $scope.emptyContent = false;
            }
          $scope.books = filteredItems;
        },
        cancel: function () {
          $scope.searching = false;
        },
        filterProperties: 'name'
      });
    };

    $scope.toggleViewStyle = function(){
      // $location.hash(0);
      $ionicScrollDelegate.$getByHandle('booksScroll').scrollTop(false);
      
      $scope.viewStyle = $scope.viewStyle === 'list' ? 'grid' : 'list';
    }
})

.controller('BookCtrl', function($scope, $sce, $timeout, $ionicBackdrop, $rootScope, $stateParams, $ionicSlideBoxDelegate, booksService){
  var vm = this;
  $scope.book = {};
  $scope.$parent.hasNoShadow = false;
  $scope.showingChapters = false;
  var theBook = $stateParams.book.replace(/\s+/g, '');
  $scope.book.name = $stateParams.book;
  $scope.chapter = $stateParams.chapter;
  $scope.chaptersArray = [0];
  $scope.chapter = $stateParams.chapter ? $stateParams.chapter : 0;

  $timeout(function(){
    // $scope.$parent.showDialpad = false;
    $scope.turnOn = 'on';
  },500);


  $scope.toggleChapters = function(value){
    $scope.showChaptersBackdrop = false;

    if(value)
      $scope.showingChapters = value;
    else
      $scope.showingChapters = !$scope.showingChapters;

    if($scope.showingChapters){
      $timeout(function() {
        $scope.showChaptersBackdrop = true;
      }, 100);
    }
  }

  // var theBook = $scope.book.replace(/\s+/g, '');
  booksService.view(theBook).then(
    function(data) {
        $scope.book.chapters = data;
        $scope.chaptersCount = data.length;
        // if (data.length > 4)
        //   vm.getArray(3);
        // else
        vm.getArray(data.length);
        // vm.goToSlide(2, 0);
        // console.log('book returned to controller.');
        $timeout(function(){
          vm.goToSlide($scope.chapter, 0);
        },500);
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
    $scope.chapter = index;
    // if($scope.chaptersArray.length <= $scope.chaptersCount)
    //   vm.getArray($scope.chaptersCount, true);
  }

  vm.goToSlide = function(index, time){
      if (!time)
        time = 500;
      $ionicSlideBoxDelegate.slide(index, time);
  }

  $scope.goToSlide = function(index, time){
      $ionicSlideBoxDelegate.slide(index);
      $scope.$parent.showDialpad = false;
      $scope.toggleChapters();
  }
})

.controller('SettingsCtrl', function($scope) {
  $scope.$parent.hasNoShadow = false;
});
