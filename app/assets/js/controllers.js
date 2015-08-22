var app = angular.module('buddybible.controllers', []);

app.controller('AppCtrl', function($scope, $sce, $mdMedia, Fullscreen, $location, $interval, $mdBottomSheet, $mdSidenav, $mdDialog, $http, books) {
  $scope.books        =  books.all();
  $scope.selectedBook =  {};
  $scope.selectedBook.name     = 'Genesis';
  $scope.selectedBook.chapters = books.getChapters('Genesis');
  $scope.bookSorts = [{testament : ''}, {testament : 'Old'},{testament : 'New'}];

  // SCREEN SIZE VARIABLES
  $scope.screenIsSm   = $mdMedia('sm');
  $scope.screenIsMd   = $mdMedia('md');
  $scope.screenIsLg   = $mdMedia('lg');
  $scope.screenIsGMd  = $mdMedia('gt-md');
  $scope.screenIsGSm  = $mdMedia('gt-md');
  $scope.$watch(function() { return $mdMedia('sm'); }, function(big) {
    // alert('now on big screen');
  });

  $scope.viewBook = function(book){
    // if(!$scope.selectedBook.name === book){
      $scope.selectedBook.name     = book;
      $scope.selectedBook.chapters = books.getChapters(book);
    // }
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

  $scope.toggleSearching = function(){
    $scope.searchChapter    =  {};
    $scope.searchingChapter =  !$scope.searchingChapter;
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
});

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

function hasWhiteSpace(s) {
  return /\s/g.test(s);
}

function MyCtrl($scope) {
    angular.element(document).ready(function () {
        console.log('Hello World');
    });
}