var app = angular.module('buddybible.controllers', []);

app.controller('MainCtrl', function($scope, $mdMedia, Fullscreen, $mdSidenav, $location) {
  // SCREEN SIZE VARIABLES
  $scope.screenIsSm   = $mdMedia('sm');
  $scope.screenIsMd   = $mdMedia('md');
  $scope.screenIsLg   = $mdMedia('lg');
  $scope.screenIsGMd  = $mdMedia('gt-md');
  $scope.screenIsGSm  = $mdMedia('gt-md');
  $scope.$watch(function() { return $mdMedia('sm'); }, function(big) {
    // alert('now on big screen');
  });  

  $scope.whatsActve = function(isItMe){
     return (isItMe === $location.path()) ? true : false ;
  }  

  $scope.toggleSearching = function(){
    $scope.search    =  {};
    $scope.searching =  !$scope.searching;
  }

  // HIGHLIGHTING AN ITEM (FOR LAGE SCREENS ONLY)
  $scope.highlight = function(what, which){
    // if($scope.screenIsLg){
      $scope.highlighting = 'true';
      $scope.highlighting = which;
      $scope.highlighting.img = 'assets/music/covers/'+which.cover;
    // }
  }

  $scope.to_trusted = function(html_code) {
    return $sce.trustAsHtml(html_code);
  }

  $scope.goFullscreen = function () {
      (Fullscreen.isEnabled()) ? Fullscreen.cancel() : Fullscreen.all();
      
      // Set Fullscreen to a specific element (bad practice)
      // Fullscreen.enable( document.getElementById('img') )
  }

  $scope.toggleSidenav = function(side){
    $mdSidenav(side).toggle();
  }

  $scope.navigateTo = function(path, title){
    $location.path(path);
  }
});

app.controller('bibleCtrl', bibleCtrl);
  function bibleCtrl(books, $scope, $sce, Page){
    Page.setTitle('Bible');
    
    $scope.books        =  books.all();
    $scope.selectedBook =  {};
    $scope.selectedBook.name     = 'Genesis';
    $scope.selectedBook.chapters = books.getChapters('Genesis');
    $scope.chapters = $scope.selectedBook.chapters;
    $scope.chapters.selectedIndex = 0;
    $scope.verseIndex = 0;
    $scope.bookSorts = [{testament : ''}, {testament : 'Old'},{testament : 'New'}];
    
    $scope.viewBook = function(book){      
      $scope.selectedBook.name     = book;
      $scope.selectedBook.chapters = books.getChapters(book);
      $scope.chapters.selectedIndex = 0;
      $scope.verseIndex = 0;
    }

    $scope.to_trusted = function(html_code) {
      return $sce.trustAsHtml(html_code);
    }

    $scope.setChapter = function(index){
      $scope.chapters.selectedIndex = index;
    }

    $scope.nextVerse = function(){
      verses = $scope.chapters[$scope.chapters.selectedIndex].verseCount;

      if($scope.verseIndex > (verses - 2))
        return false
      else
        parseFloat($scope.verseIndex +=1);
    }

    $scope.prevVerse = function(){
      if($scope.verseIndex <= 0)
        return false
      else
        parseFloat($scope.verseIndex -=1);
    }

    $scope.showDtails = function(bookId){
      for (var i = 0; i < $scope.books.length; i++) {
        if($scope.books[i].id == bookId)
          $scope.books[i].showingDetails = !$scope.books[i].showingDetails;
        else
          $scope.books[i].showingDetails = false;
      }
    }

    $scope.quickSearch = function(entry) {
      // IF THE USER'S ENTRY HAS NO SPACE YET SHOW MATCHING BOOK SHORTNAMES
      if(!hasWhiteSpace(entry)){
        // SHOW SHORT NAMES AS CHIPS
      }else{
        // SHOW CHAPTERS
      }
    }
  }
app.controller('bookTagsCtrl', DemoCtrl);
  function DemoCtrl ($timeout, $q, $scope) {
    var self = this;
    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;
    self.vegetables = loadBooks();
    self.selectedVegetables = [];
    /**
     * Search for vegetables.
     */
    function querySearch (query) {
      var results = query ? self.vegetables.filter(createFilterFor(query)) : [];
      return results;
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(vegetable) {
        return (vegetable._lowername.indexOf(lowercaseQuery) === 0) || (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
      };
    }
    function loadBooks() {
      return $scope.books.map(function (bk) {
        bk._lowername = bk.name.toLowerCase();
        bk._lowertype = bk.testament.toLowerCase();
        return bk;
      });
    }
}

app.controller('collectionsCtrl', collectionsCtrl);
  function collectionsCtrl(books, $scope, Page){
    Page.setTitle('My Verse Collections');
  }

app.controller('subscriptionsCtrl', subscriptionsCtrl);
  function subscriptionsCtrl(books, $scope, Page){
    Page.setTitle('My Subscriptions');
  }

app.controller('resolutionsCtrl', resolutionsCtrl);
  function resolutionsCtrl(books, $scope, Page){
    Page.setTitle('My Resolutions');

    $scope.resolutions = [
      {name: "Read Whole Bible", description: "Read the whole bible in two months only", complete : false},
      {name: "Cram Bible Verses", description: "Cram three new bible verses everyday for a month", complete : false},
      {name: "Paul's Adventures", description: "Read and learn about all of St. Paul's Adventures", complete : true},
    ];
    $scope.resSorts = [{complete : ''}, {complete : true},{complete : false}, {suggested: true}];
  }

app.controller('fabdialCtrl', function($mdDialog) {
  var self = this;
  self.openDialog = function($event, action) {
    // Show the dialog
    $mdDialog.show({
      clickOutsideToClose: true,
      parent: angular.element(document.querySelector('#verseStuff')),
      controller: function($mdDialog, $scope) {
        // Save the clicked item
        this.action = action;
        this.collections = [
          {name: 'Prophetic Scriptures'},
          {name: 'Famous Stories'},
        ]
        // Setup some handlers
        this.close = function() {
          $mdDialog.cancel();
        };
        this.submit = function() {
          $mdDialog.hide();
        };
        this.addToCollection = function(val){
          var collection = {};
          collection.name = val;
          this.collections.push(collection);
          this.addingnewcollection = false;
        }
      },
      controllerAs: 'dialog',
      templateUrl: 'dialog.html',
      targetEvent: $event
    });
  }
});

function hasWhiteSpace(s) {
  return /\s/g.test(s);
}

function MyCtrl($scope) {
    angular.element(document).ready(function () {
        console.log('Hello World');
    });
}