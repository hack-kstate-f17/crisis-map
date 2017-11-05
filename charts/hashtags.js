google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

    var hashtag_data = {"KoKoBop": 120, "POWER": 187, "Power": 986, "Irma": 109, "EXO": 1041, "TheWar": 226, "EXOinStudio92": 268, "power": 128, "EXO_POWER": 131, "PushAwardsKathNiels": 121, "ThePowerofMusic": 261, "TheWarEXO": 127, "\uc5d1\uc18c": 361};

    // var hashtag_data;
    // $.getJSON('data/hashtags.json', function(json) {
        // hashtag_data = json;
    // });

    hashtag_data = transformData(hashtag_data);
    console.log(hashtag_data);
  // var data = google.visualization.arrayToDataTable([
  //   ['Hashtag', 'Hashtag Usage', { role: 'style' }],
  //   ['#hurricane', 5000, '#3ab8ee'],
  //   ['#harvey', 3000, '#69c9f2'],
  //   ['#winds', 2000, '#97daf6'],
  //   ['#storms', 1000, '#c6ebfa'],
  //   ['#helpharvey', 2000, '#97daf6']
  // ]);

  var data = google.visualization.arrayToDataTable(hashtag_data);

  var options = {
    legend: 'none',
    title: 'Hashtag Usage',
    chartArea: {width: '50%'},
    hAxis: {
      title: '',
      minValue: 0
    },
    vAxis: {
      title: ''
    }
  };
  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}


function transformData(obj){
    var transformed = [['Hashtag', 'Hashtag Usage'],['#harvey', 120]];
    for (var key in obj) {
        console.log(key, obj[key]);
        transformed.push(['#' + key, obj[key]]);
    }
    // console.log(transformed);
    return transformed;
}
//
