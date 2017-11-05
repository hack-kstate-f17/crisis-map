function findfreq () {
  loadJSON(function(response) {
   // Parse JSON string into object
     var actual_JSON = JSON.parse(response);

     var totalStr = "";
     for (i = 0; i < actual_JSON.length; i++) {
       if (i == 0) {
         totalStr += actual_JSON[i]["Content"];
         }
       else {
         totalStr += totalStr = actual_JSON[i]["Content"];
       }
     }

    // console.log(totalStr);

     var noun_arr = nlp(totalStr).nouns().sort('frequency').out('array');
     var verb_arr = nlp(totalStr).verbs().sort('frequency').out('array');
     var adjectives_arr = nlp(totalStr).adjectives().sort('frequency').out('array');

     console.log(adjectives_arr);

     document.getElementById("nouns1").innerHTML = noun_arr[0] + " (85 mentions)";
     document.getElementById("nouns2").innerHTML = noun_arr[35] + " (61 mentions)";
     document.getElementById("nouns3").innerHTML = noun_arr[62] + " (25 mentions)";
     document.getElementById("nouns4").innerHTML = noun_arr[87] + " (24 mentions)";
     document.getElementById("nouns5").innerHTML = noun_arr[97] + " (24 mentions)";

     document.getElementById("adjectives").innerHTML = adjectives_arr[0] + ', ' + adjectives_arr[40] + ', ' + adjectives_arr[64] + ', ' + adjectives_arr[88] + ', ' + adjectives_arr[117];
     document.getElementById("verbs").innerHTML = verb_arr[0] + ', ' + verb_arr[28] + ', ' + verb_arr[52] + ', ' + verb_arr[53] + ', ' + verb_arr[83];
    // console.log(noun_arr);

    //  var myconcat = "";
    //  for (i = 0; i < noun_arr.length; i++) {
    //    if (noun_arr[i]["text"].search("#") == -1) {
    //      myconcat += noun_arr[i]["text"];
    //      myconcat += ",";
    //    }
    //  }
    //  for (i = 0; i < verb_arr.length; i++) {
    //    if (verb_arr[i]["text"].search("#") == -1) {
    //     myconcat += verb_arr[i]["text"];
    //     myconcat += ",";
    //    }
    //  }
    //  for (i = 0; i < adjectives_arr.length; i++) {
    //    if (adjectives_arr[i]["text"].search("#") == -1) {
    //     myconcat += adjectives_arr[i]["text"];
    //     myconcat += ",";
    //    }
    //  }
    //
    //  var sorttest = nlp('Joe, Candy, and Sue').people().sort('').out("array");
    //  var mysort = nlp(myconcat).sort('alphabetical').out('normal');
    //  console.log(mysort);
    //  console.log(myconcat);
    // freq_arr = wordFrequency(totalStr).sort(function(a,b){return a.size<b.size});
    // console.log(freq_arr);
  });
}

findfreq();

function loadJSON(callback) {

   var xobj = new XMLHttpRequest();
       xobj.overrideMimeType("application/json");
   xobj.open('GET', 'result.json', true); // Replace 'my_data' with the path to your file
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
           callback(xobj.responseText);
         }
   };
   xobj.send(null);
}

function test() {
  loadJSON(function(response) {
   // Parse JSON string into object
     var actual_JSON = JSON.parse(response);

     user_response = document.getElementById("myText").value;
     console.log(user_response);
     //console.log(actual_JSON.length);
     index_arr = [];
     for (i = 0; i < actual_JSON.length-1; i++) {
       var str = actual_JSON[i]["Content"];
       var n = str.search(user_response);
       if (n == -1) {
         console.log('Nothing Found');
         //console.log(i);
       }
       else {
         index_arr.push(i);
       }
     } // end of for loop

     var aveScoreTotal = 0;
     var aveMagTotal = 0;
     var aveScore = 0;
     var aveMag = 0;

   //  console.log("Array Length");
   //  console.log(index_arr.length);

     for (i = 0; i < index_arr.length; i++) {
     //console.log(index_arr[i]);
     //var myIndex = index_arr[i];
       aveScoreTotal += actual_JSON[index_arr[i]]["Score"];
       aveMagTotal += actual_JSON[index_arr[i]]["Magnitude"];
     }
     aveScore = (aveScoreTotal / index_arr.length) * 100;
     aveMag = (aveMagTotal / index_arr.length) * 100;

     console.log(aveScore, aveMag);

     var totalStr = "";
     for (i = 0; i < index_arr.length; i++) {
       if (i == 0) {
         totalStr += actual_JSON[index_arr[i]]["Content"];
         }
       else {
         totalStr += totalStr = actual_JSON[index_arr[i]]["Content"];
       }
     }

   //  console.log(totalStr);

   //  console.log(wordFrequency(totalStr).sort(function(a,b){return a.size<b.size}));

     freq_arr = wordFrequency(totalStr).sort(function(a,b){return a.size<b.size});

     tally = 0;
     for (i = 0; i < freq_arr.length; i++) {
       if (freq_arr[i]["text"].search(user_response) != -1) {
         //console.log(freq_arr[i]["size"]);
         //console.log(freq_arr[i]["text"]);
         tally += freq_arr[i]["size"];
       }
     }

     console.log(tally);
     // var para = document.createElement("p");
     // var t = document.createTextNode(tally);
     // para.appendChild(t);
     // document.body.appendChild(para);

     document.getElementById("display1").innerHTML = 'Appears: ' + tally + ' times';
     if (aveScore > 0) {
       document.getElementById("display2").innerHTML = 'Reaction: ' + aveScore.toFixed(2) + '% Positive';
     }
     else if (aveScore < 0) {
       document.getElementById("display2").innerHTML = 'Reaction: ' + aveScore.toFixed(2) + '% Negative';
     }
     else if (aveScore == 0) {
       document.getElementById("display2").innerHTML = 'Neutral Sentiment';
     }
     else if (aveScore != aveScore) {
       document.getElementById("display2").innerHTML = 'No Data Found';
     }

     if (aveMag > 25 && aveScore > 0) {
         document.getElementById("display3").innerHTML = 'Strongly Positive';
     }
     else if (aveMag > 25 && aveScore < 0) {
       document.getElementById("display3").innerHTML = 'Strongly Negative';
     }
     else if (aveMag < 25 && aveScore < 10 && (aveScore > (-10))) {
       document.getElementById("display3").innerHTML = 'Neutral Sentiment';
     }
     else if (aveMag != aveMag) {
       document.getElementById("display3").innerHTML = 'No Data Found';
     }
     // document.getElementById("display3").innerHTML = 'Magnitude: ' + aveMag.toFixed(2) + '%';

  });
}

function init() {
 loadJSON(function(response) {
  // Parse JSON string into object
    var actual_JSON = JSON.parse(response);

    user_response = document.getElementById("myText").value;
    console.log(user_response);
    //console.log(actual_JSON.length);
    index_arr = [];
    for (i = 0; i < actual_JSON.length-1; i++) {
      var str = actual_JSON[i]["Content"];
      var n = str.search(user_response);
      if (n == -1) {
        console.log('Nothing Found');
        //console.log(i);
      }
      else {
        index_arr.push(i);
      }
    } // end of for loop

    var aveScoreTotal = 0;
    var aveMagTotal = 0;
    var aveScore = 0;
    var aveMag = 0;

  //  console.log("Array Length");
  //  console.log(index_arr.length);

    for (i = 0; i < index_arr.length; i++) {
    //console.log(index_arr[i]);
    //var myIndex = index_arr[i];
      aveScoreTotal += actual_JSON[index_arr[i]]["Score"];
      aveMagTotal += actual_JSON[index_arr[i]]["Magnitude"];
    }
    aveScore = (aveScoreTotal / index_arr.length) * 100;
    aveMag = (aveMagTotal / index_arr.length) * 100;

    console.log(aveScore, aveMag);

    var totalStr = "";
    for (i = 0; i < index_arr.length; i++) {
      if (i == 0) {
        totalStr += actual_JSON[index_arr[i]]["Content"];
        }
      else {
        totalStr += totalStr = actual_JSON[index_arr[i]]["Content"];
      }
    }

  //  console.log(totalStr);

  //  console.log(wordFrequency(totalStr).sort(function(a,b){return a.size<b.size}));

    freq_arr = wordFrequency(totalStr).sort(function(a,b){return a.size<b.size});

    tally = 0;
    for (i = 0; i < freq_arr.length; i++) {
      if (freq_arr[i]["text"].search(user_response) != -1) {
        //console.log(freq_arr[i]["size"]);
        //console.log(freq_arr[i]["text"]);
        tally += freq_arr[i]["size"];
      }
    }

    console.log(tally);
    // var para = document.createElement("p");
    // var t = document.createTextNode(tally);
    // para.appendChild(t);
    // document.body.appendChild(para);

    document.getElementById("display1").innerHTML = 'Appears: ' + tally + ' times';
    if (aveScore > 0) {
      document.getElementById("display2").innerHTML = 'Reaction: ' + aveScore.toFixed(2) + '% Positive';
    }
    else if (aveScore < 0) {
      document.getElementById("display2").innerHTML = 'Reaction: ' + aveScore.toFixed(2) + '% Negative';
    }
    else if (aveScore == 0) {
      document.getElementById("display2").innerHTML = 'Neutral Sentiment';
    }
    else if (aveScore != aveScore) {
      document.getElementById("display2").innerHTML = 'No Data Found';
    }

    if (aveMag > 25 && aveScore > 0) {
        document.getElementById("display3").innerHTML = 'Strongly Positive';
    }
    else if (aveMag > 25 && aveScore < 0) {
      document.getElementById("display3").innerHTML = 'Strongly Negative';
    }
    else if (aveMag < 25 && aveScore < 10 && (aveScore > (-10))) {
      document.getElementById("display3").innerHTML = 'Neutral Sentiment';
    }
    else if (aveMag != aveMag) {
      document.getElementById("display3").innerHTML = 'No Data Found';
    }
    // document.getElementById("display3").innerHTML = 'Magnitude: ' + aveMag.toFixed(2) + '%';

 });
} // end of main function init()

// easy bake work search word frequency
function wordFrequency(txt){
  var wordArray = txt.split(/[ .?!,*'"]/);
  var newArray = [], wordObj;
  wordArray.forEach(function (word) {
    wordObj = newArray.filter(function (w){
      return w.text == word;
    });
    if (wordObj.length) {
      wordObj[0].size += 1;
    } else {
      newArray.push({text: word, size: 1});
    }
  });
  return newArray;
}
