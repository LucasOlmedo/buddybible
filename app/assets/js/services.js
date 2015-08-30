angular.module('buddybible.services', [])

.factory('Page', function () {
        var title = '';

        return {
           title: function() { return title; },
           setTitle: function(newTitle) { title = newTitle }
        };
    })

// A RESTful factory for retrieving contacts from 'contacts.json'
.factory('books', ['$http', function ($http) {
  
  var books      = [];
  var shortnames = ["Gn", "Ex", "Lv", "Nm", "Dt", "Jo", "Jgs", "Ru", "1 Sm", "2 Sm", "1 Kgs", "2 Kgs", "1 Chr", "2 Chr", "Ezr", "Neh", "Est", 
  "Jb", "Ps", "Prv", "Eccl", "Sg", "Is", "Jer", "Lam", "Ez", "Dn", "Hos", "Jl", "Am", "Ob", "Jon", "Mi", "Na", "Hb", "Zep", 
  "Hg", "Zec", "Mal", "Mat", "Mk", "Lk", "Jn", "Ac", "Rm", "1 Co", "2 Co", "Ga", "Ep", "Php", "Col", "1 Th", "2 Th", "1 Tm", "2 Tm",
   "Ti", "Phm", "He", "Jm", "1 Pt", "2 Pt", "1 Jn", "2 Jn", "3 Jn", "Ju", "Rv"];

  $http.get('assets/js/books.json').success(function(data){
    for (var i = 0; i < data.length; i++) {
      book = {
        id: parseFloat(i + 1),
        name: data[i],
        shortname : shortnames[i],
        testament : (i <= 38 ) ? 'Old' : 'New',
        chapters  : {}
      }
      books.push(book);      
    };
  }).error(function(){
    console.error(error);
  });

  function getBookChapters(book, ver){ // FROM GETBIBLE API
    version = (ver) ? ver : '' ;
    jQuery.ajax({
      url:'http://getbible.net/json',
      dataType: 'jsonp',
      data: 'p='+book+'&v='+version,
      jsonp: 'getbible',
      success:function(json){
        // set text direction
        if (json.direction == 'RTL'){
          var direction = 'rtl';
        } else {
          var direction = 'ltr'; 
        }

        chapters = [];

        jQuery.each(json.book, function(index, value) {
          chapter = {};
          chapter.id = value.chapter_nr;
          chapter.verses = [];

          jQuery.each(value.chapter, function(index, value) {
            verse = {};
            verse.id      = value.verse_nr;
            verse.content = value.verse;

            chapter.verses.push(verse);
          });
            chapters.push(chapter);
        });
        return chapters;
      },
      error:function(){
          console.log('No scripture was returned, please try again!'); // <---- this is the div id we update
          return {};
      }
    });  
  }

  return {
    all: function() {
      console.log(books);
      return books;
    },
    getChapters: function(theBook, ver) {     
      theBook = theBook.replace(/\s+/g, '');
      chapters = [];
      $http.get('assets/bible/'+theBook+'.json').success(function(data){
        data = data.chapters;
        for (var i = 0; i < data.length; i++) {
          chapter = {
            id           : parseFloat(i + 1),
            verses       : data[i].verses,
            stringVerses : VerseString(data[i].verses),
            verseCount   : data[i].verses.length
          }
          console.log(chapter);
          chapters.push(chapter);
        };
      });
      return chapters;
      // return getBookChapters(book, ver); // FROM GETBIBLE API
    }
  };

  function VerseString(verses){
    string = '';
    for (var i = 0; i < verses.length; i++) {
      string += '<div style="margin:5px"><strong><sup>'+[i+1]+'</sup></strong> ';
      string += verses[i][i+1] +'</div><br/>';
    };
    return string;
  }
}]);
