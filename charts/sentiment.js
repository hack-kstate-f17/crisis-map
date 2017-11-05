google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Reaction', 'Percentage'],
    ['positive',     33],
    ['neutral',      33],
    ['negative',      33]
  ]);

  var options = {
    title: 'Sentiment',
    slices: {
      0: {color:'palegreen' },
      1: {color:'mediumpurple' },
      2: {color:'lightblue'},
      3: {color:'pink'},
      4: {color:'teal'}
    },
    pieHole: 0.4,
  };

  var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  chart.draw(data, options);
}
