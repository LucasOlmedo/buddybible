angular.module('ionicons.services', [])

.factory('booksService', ['$http', '$q', '$timeout', function($http, $q, $timeout) {
    return {
        all: function() {
            var def = $q.defer();

            $http.get("js/books-detailed.json")
                .success(function(data) {
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get books");
                });
            return def.promise;
        },
        view: function(theBook){
          var def = $q.defer();
          var worker = new Worker('js/read_book.js');
          
          worker.addEventListener('message', function(e) {
            console.log('Worker said: ', e.data);
            def.resolve(e.data);
          }, false);

          worker.postMessage(theBook);

          // $http.get('bible/'+theBook+'.json')
          //   .success(function(data){
          //     data = data.chapters;
          //     var chapters = [];
          //     for (var i = 0; i < data.length; i++) {
          //       chapter = {
          //         id           : parseFloat(i + 1),
          //         verses       : data[i].verses,
          //         stringVerses : VerseString(data[i].verses),
          //         verseCount   : data[i].verses.length
          //       }
          //       chapters.push(chapter);
          //     }
          //     def.resolve(chapters);
          //   })
          //   .error(function() {
          //       def.reject("Failed to load book");
          //   });

          return def.promise;
          // return getBookChapters(book, ver); // FROM GETBIBLE API
        }
    }

    function VerseString(verses){
      string = '';
      for (var i = 0; i < verses.length; i++) {
        string += '<div style="margin:5px"><strong><sup style="color:#FF5722;font-weight:bolder">'+[i+1]+'</sup></strong> ';
        string += verses[i][i+1] +'</div><br/>';
      };
      return string;
    }
}]);