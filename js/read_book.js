onmessage = function(e) {
  console.log('Message received from main script');
  // var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  // console.log('Posting message back to main script');

  fetch('../bible/'+e.data+'.json')
     .then(function(response) {
          return response.json();
     })
     .then(function(res) {
          console.log(res);
          data = res.chapters;
          var chapters = [];
          for (var i = 0; i < data.length; i++) {
           chapter = {
             id           : parseFloat(i + 1),
             verses       : data[i].verses,
             stringVerses : VerseString(data[i].verses),
             verseCount   : data[i].verses.length
           }
           chapters.push(chapter);
         }
         
         postMessage(chapters);
     })
     .catch(function(err){
          console.log("Error: " + err);
     });
}

function VerseString(verses){
      string = '';
      for (var i = 0; i < verses.length; i++) {
        string += '<div style="margin:5px"><strong><sup style="color:#FF5722;font-weight:bolder">'+[i+1]+'</sup></strong> ';
        string += verses[i][i+1] +'</div><br/>';
      };
      return string;
    }