google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    // alert("Drawering");


    var data = google.visualization.arrayToDataTable([
        ['Reaction', 'Percentage'],
        ['positive',     59.6],
        ['neutral',      23.2],
        ['negative',      17.2]
    ]);

  var options = {
    title: 'Sentiment',
    titleTextStyle: {
      //  color: <string>,    //
       fontSize: 24
    },
    slices: {
      0: {color:'palegreen' },
      1: {color:'mediumpurple' },
      2: {color:'lightblue'},
      3: {color:'pink'},
      4: {color:'teal'}
    },
    pieHole: 0.4,
    backgroundColor: '#e4e4e4'
  };

  var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  chart.draw(data, options);
}
