angular.module('ionicons.controllers', [])

.controller('AppCtrl', function($scope, $timeout, $ionicPopover, $ionicModal, $location) {
  $scope.showPackExtensions = false;
  $scope.searching = false;
  $scope.showDialpad = false;

  $ionicModal.fromTemplateUrl('templates/contact.html', {
    scope: $scope,
    animation: 'fade-in'
  }).then(function(modal) {
    $scope.contactModal = modal;
  });

  $scope.showContactsModal = function(session){
    $scope.closeMainPopover();
    $scope.contactModal.show();
  }
  $scope.closeContactsModal = function() {
    $scope.contactModal.hide();
  };

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

  // $timeout(function(){
  //   $('#screen').fadeOut('slow');
  // }, 2000);
})

.controller('BooksCtrl', function($scope, $rootScope, $state, $ionicScrollDelegate, $ionicFilterBar, $timeout, $location, booksService) {
    var vm = this;
    $scope.previewingABook = false;
    $scope.$parent.hasNoShadow = false;
    $scope.books = [];
    $scope.viewStyle = 'list';
    $scope.emptyContent = false;

    booksService.all().then(
      function(books) {
          $scope.books = books;
          console.log('booklist returned to controller.');
      },
      function(data) {
          console.log('booklist retrieval failed.')
      });

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

    $scope.openBook = function(book){
      $state.go('app.book', {book: book});

      requestAnimationFrame(function(){
        requestAnimationFrame(function(){
          booksService.view(book.replace(/\s+/g, '')).then(
            function(data) {
                $rootScope.$broadcast('book_fetched', data);
            },
            function(data) {
                console.log('book retrieval failed.')
          });
        })
      });
    }
})

.controller('BookCtrl', function($scope, $sce, $timeout, $ionicActionSheet, $ionicPopup, $rootScope, $stateParams, $ionicSlideBoxDelegate, booksService){
  var vm = this;
  $scope.book = {};
  $scope.$parent.hasNoShadow = false;
  $scope.showingChapters = false;
  var theBook = $stateParams.book.replace(/\s+/g, '');
  $scope.book.name = $stateParams.book;
  $scope.chaptersArray = [0];
  // $scope.chapter = $stateParams.chapter ? $stateParams.chapter : 0;
  $scope.chapter = 0;

  $timeout(function(){
    $scope.turnOn = 'on';
  },500);

  $scope.previewVerse = function(verseIndex, content){
    var passage = {
      book: $scope.book.name,
      chapter : $scope.chapter + 1,
      verse: verseIndex,
      content : content
    }

    $ionicActionSheet.show({
      titleText: '<h3>' + passage.book + ' ' + passage.chapter + ' : ' + passage.verse + '</h3>',
      buttons: [
        { text: '<i class="icon ion-android-share-alt balance"></i> Share' },
        { text: '<i class="icon ion-ios-color-wand assertiv"></i> Highlight' },
      ],
      // destructiveText: 'Cancel',
      // destructiveText: '<i class="icon ion-close"></i> Cancel',
      // cancelText: 'Cancel',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        if(index === 0){
          $scope.shareOptions(passage);
        }
        else if(index === 1){
          // do som'n
        }
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        return true;
      }
    });
  }

  $scope.shareOptions = function(passage){
    $ionicActionSheet.show({
      titleText: '<h3>Share options:</h3>',
      buttons: [
        { text: '<i class="icon zmdi zmdi-facebook b"></i> Facebook' },
        { text: '<i class="icon zmdi zmdi-twitter"></i> Twitter' },
        { text: '<i class="icon ion-android-mail"></i> Sms' },
      ],
      // destructiveText: 'Cancel',
      // destructiveText: '<i class="icon ion-close"></i> Cancel',
      // cancelText: 'Cancel',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        if(index === 0){
          // $scope.shareOptions(passage);
        }
        else if(index === 1){
          // do som'n
        }
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        return true;
      }
    });
    // var myPopup = $ionicPopup.show({
    //   template: '<i class="icon ion-android-share-alt"></i> Facebook',
    //   title: 'Share on:',
    //   // subTitle: 'Please use normal things',
    //   scope: $scope,
    //   buttons: [
    //     { text: 'Cancel' },
    //     {
    //       text: '<b>Save</b>',
    //       type: 'button-positive',
    //       onTap: function(e) {
    //         if (!$scope.data.wifi) {
    //           //don't allow the user to close unless he enters wifi password
    //           e.preventDefault();
    //         } else {
    //           return $scope.data.wifi;
    //         }
    //       }
    //     }
    //   ]
    // });
    // myPopup.then(function(res) {
    //   console.log('Tapped!', res);
    // });
    // $timeout(function() {
    //    myPopup.close(); //close the popup after 3 seconds for some reason
    // }, 3000);
    $scope.cleanUp = function(oldString){
      return oldString.replace(/2019/g,"'");
      // return oldString;
    }
  }

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

  $scope.$on('book_fetched', function(e, data) { 
        console.log(data); 
        $scope.book.chapters = data;
        $scope.chaptersCount = data.length;
        
        vm.getArray(data.length);
        
        $timeout(function(){
          vm.goToSlide($scope.chapter, 0);
        },500);
   });

  // var theBook = $scope.book.replace(/\s+/g, '');
  // booksService.view(theBook).then(
  //   function(data) {
  //       $scope.book.chapters = data;
  //       $scope.chaptersCount = data.length;
        
  //       vm.getArray(data.length);
        
  //       $timeout(function(){
  //         vm.goToSlide($scope.chapter, 0);
  //       },500);
  //   },
  //   function(data) {
  //       console.log('book retrieval failed.')
  // });

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
  $scope.receiveDailyVerses = true;
});
