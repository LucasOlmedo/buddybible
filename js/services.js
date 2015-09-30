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

            $http.get("js/books-detailed.json")
                .success(function(data) {
                    // for (var i = 0; i < data.length; i++) {
                    //     data[i].id = i + 1;
                    //     data[i].shortname = shortnames[i];
                    // };
                    // console.log(JSON.stringify(data));
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get books");
                });
            return def.promise;
        },
        view: function(theBook){
          var def = $q.defer();
          chapters = [];
          $http.get('bible/'+theBook+'.json')
            .success(function(data){
              data = data.chapters;
              for (var i = 0; i < data.length; i++) {
                chapter = {
                  id           : parseFloat(i + 1),
                  verses       : data[i].verses,
                  stringVerses : VerseString(data[i].verses),
                  verseCount   : data[i].verses.length
                }
                chapters.push(chapter);
              }
              def.resolve(chapters);
            })
            .error(function() {
                def.reject("Failed to load book");
            });
            return def.promise;
          // return getBookChapters(book, ver); // FROM GETBIBLE API
        }
    }

     function VerseString(verses){
      string = '';
      for (var i = 0; i < verses.length; i++) {
        string += '<div style="margin:5px"><md-button ng-click="verseClicked('+verses[i][i+1]+')"><strong><sup style="color:#FF5722;font-weight:bolder">'+[i+1]+'</sup></strong> ';
        string += verses[i][i+1] +'</md-button></div><br/>';
      };
      return string;
    }
}]);