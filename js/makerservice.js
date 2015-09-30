angular.module('ionicons.services', [])

.factory('booksService', ['$http', '$q', '$timeout', function($http, $q, $timeout) {
    var themeList = ['purple' , 'deep-purple', 'orange', 'deep-orange', 'red', 'blue', 'light-blue', 'green', 'light-green', 'pink', 'yellow',  'lime', 'amber', 'teal',  'indigo','cyan', 'brown', 'grey', 'blue-grey'];
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