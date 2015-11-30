angular.module('ionicons.services', [])

.factory('booksService', ['$http', '$q', '$timeout', function($http, $q, $timeout) {
    var themeList = ['purple' , 'deep-purple', 'orange', 'deep-orange', 'red', 'blue', 'light-blue', 'green', 'light-green', 'pink', 'yellow',  'lime', 'amber', 'teal',  'indigo','cyan', 'brown', 'grey', 'blue-grey'];
    var shortnames = ["Gn", "Ex", "Lv", "Nm", "Dt", "Jo", "Jgs", "Ru", "1 Sm", "2 Sm", "1 Kgs", "2 Kgs", "1 Chr", "2 Chr", "Ezr", "Neh", "Est", 
  "Jb", "Ps", "Prv", "Eccl", "Sg", "Is", "Jer", "Lam", "Ez", "Dn", "Hos", "Jl", "Am", "Ob", "Jon", "Mi", "Na", "Hb", "Zep", 
  "Hg", "Zec", "Mal", "Mat", "Mk", "Lk", "Jn", "Ac", "Rm", "1 Co", "2 Co", "Ga", "Ep", "Php", "Col", "1 Th", "2 Th", "1 Tm", "2 Tm",
   "Ti", "Phm", "He", "Jm", "1 Pt", "2 Pt", "1 Jn", "2 Jn", "3 Jn", "Ju", "Rv"];

    return {
        all: function() {
            var def = $q.defer();

            $http.get("js/books.json")
                .success(function(data) {
                    var books = [];
                    for (var i = 0; i < data.length; i++) {
                      $http.get('bible/'+data[i].name.replace(/\s+/g, '')+'.json').success(function(book){
                        var abook = {
                            name: book.book,
                            id : parseFloat(i),
                            chaptersCount : parseFloat(book.chapters.length)
                        }
                        books.push(abook);
                      });
                    };
                    $timeout(function() {
                        console.log(JSON.stringify(books));
                        def.resolve(books);
                    }, 5000);
                })
                .error(function() {
                    def.reject("Failed to get books");
                });
            return def.promise;
        }
    }

    function getChapters(chapters){     
        var myChapters = [];
        for (var i = 0; i < chapters.length; i++) {
          chapter = {
            id           : parseFloat(i + 1),
            verseCount   : chapters[i].verses.length
          }
          myChapters.push(chapter);
        };
        return myChapters;
    }
}]);