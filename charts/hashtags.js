google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {
  var data = google.visualization.arrayToDataTable([
    ['Hashtag', 'Hashtag Usage', { role: 'style' }],
    ['#hurricane', 5000, '#3ab8ee'],
    ['#harvey', 3000, '#69c9f2'],
    ['#winds', 2000, '#97daf6'],
    ['#storms', 1000, '#c6ebfa'],
    ['#helpharvey', 2000, '#97daf6']
  ]);

  var options = {
    titleTextStyle: {
      //  color: <string>,    //
      fontSize: 24
    },
    backgroundColor: '#e4e4e4',
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
