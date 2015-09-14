angular.module('buddybible.services', [])

.factory('books', ['$http', function ($http){
  
  var books      = [];
  var shortnames = ["Gn", "Ex", "Lv", "Nm", "Dt", "Jo", "Jgs", "Ru", "1 Sm", "2 Sm", "1 Kgs", "2 Kgs", "1 Chr", "2 Chr", "Ezr", "Neh", "Est", 
  "Jb", "Ps", "Prv", "Eccl", "Sg", "Is", "Jer", "Lam", "Ez", "Dn", "Hos", "Jl", "Am", "Ob", "Jon", "Mi", "Na", "Hb", "Zep", 
  "Hg", "Zec", "Mal", "Mat", "Mk", "Lk", "Jn", "Ac", "Rm", "1 Co", "2 Co", "Ga", "Ep", "Php", "Col", "1 Th", "2 Th", "1 Tm", "2 Tm",
   "Ti", "Phm", "He", "Jm", "1 Pt", "2 Pt", "1 Jn", "2 Jn", "3 Jn", "Ju", "Rv"];

  var themeList = ['purple' , 'deep-purple', 'orange', 'deep-orange', 
                    'red', 'blue', 'light-blue', 'green', 'light-green', 
                    'pink', 'yellow',  'lime', 'amber', 'teal',  'indigo',
                    'cyan', 'brown', 'grey', 'blue-grey'];

  $http.get('js/books.json').success(function(data){
    for (var i = 0; i < data.length; i++) {
      book = {
        id: parseFloat(i + 1),
        name: data[i],
        shortname : shortnames[i],
        theme: themeList[Math.floor(Math.random() * themeList.length)],
        testament : (i <= 38 ) ? 'Old' : 'New',
        chapters  : {}
      }
      books.push(book);      
    };
  });

  return {
    all: function() {
      console.log(books);
      return books;
    },
    get: function(bookId) {
      for (var i = 0; i < books.length; i++) {
        if (books[i].id === parseInt(bookId)) {
          return books[i];
        }
      }
      return null;
    },
    getChapters: function(theBook, ver) {     
      theBook = theBook.replace(/\s+/g, '');
      chapters = [];
      $http.get('bible/'+theBook+'.json').success(function(data){
        data = data.chapters;
        for (var i = 0; i < data.length; i++) {
          chapter = {
            id           : parseFloat(i + 1),
            verses       : data[i].verses,
            stringVerses : VerseString(data[i].verses),
            verseCount   : data[i].verses.length
          }
          chapters.push(chapter);
        };
      });
      return chapters;
      // return getBookChapters(book, ver); // FROM GETBIBLE API
    },
    remove: function(book) {
      books.splice(books.indexOf(book), 1);
    }
  };

  function VerseString(verses){
    string = '';
    for (var i = 0; i < verses.length; i++) {
      string += '<div style="margin:5px"><md-button ng-click="verseClicked('+verses[i][i+1]+')"><strong><sup>'+[i+1]+'</sup></strong> ';
      string += verses[i][i+1] +'</md-button></div><br/>';
    };
    return string;
  }
}]);
