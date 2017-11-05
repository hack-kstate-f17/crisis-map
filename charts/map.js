var coords = [[-96.9935, 28.8169], [-95.3832, 29.7629], [8.4445, 46.813], [170.3666, -43.5877], [2.3412, 48.8569], [8.4445, 46.813], [170.3666, -43.5877], [-96.9935, 28.8169], [-90.3213159, 38.62747212], [-95.6141, 29.5996], [13.377, 52.5161], [-100.891, 34.9364], [13.377, 52.5161], [2.3412, 48.8569], [8.4445, 46.813], [170.3666, -43.5877], [19.1343, 51.9189], [19.1343, 51.9189], [12.4958, 41.9031], [-95.6141, 29.5996], [13.377, 52.5161], [12.4958, 41.9031], [19.1343, 51.9189], [8.4445, 46.813], [13.377, 52.5161], [12.4958, 41.9031], [19.1343, 51.9189], [8.4445, 46.813], [-95.3832, 29.7629], [-95.3832, 29.7629], [13.377, 52.5161], [19.1343, 51.9189], [2.3412, 48.8569], [8.4445, 46.813], [170.3666, -43.5877], [-97.818158, 30.032212], [13.377, 52.5161], [12.4958, 41.9031], [19.1343, 51.9189], [2.3412, 48.8569], [8.4445, 46.813], [170.3666, -43.5877], [13.377, 52.5161], [12.4958, 41.9031], [19.1343, 51.9189], [8.4445, 46.813], [170.3666, -43.5877], [13.377, 52.5161], [12.4958, 41.9031], [19.1343, 51.9189], [8.4445, 46.813], [13.377, 52.5161], [12.4958, 41.9031], [19.1343, 51.9189], [8.4445, 46.813], [-100.0, 31.0], [13.377, 52.5161], [12.4958, 41.9031], [19.1343, 51.9189], [8.4445, 46.813], [-97.2, 28.5], [-79.3149631, 43.7360288], [-79.3149631, 43.7360288], [-79.3149631, 43.7360288], [13.377, 52.5161], [12.4958, 41.9031], [-98.309, 56.9547], [19.1343, 51.9189], [8.4445, 46.813], [14.7545, 47.6965], [-95.52751243, 29.69022441], [13.377, 52.5161], [12.4958, 41.9031], [19.1343, 51.9189], [14.7545, 47.6965], [8.4445, 46.813], [13.377, 52.5161], [12.4958, 41.9031], [19.1343, 51.9189], [14.7545, 47.6965], [8.4445, 46.813], [-95.10738121, 29.45570174], [-97.7639, 30.2672], [4.4768, 50.501], [14.7545, 47.6965], [8.4445, 46.813], [-96.9935, 28.8169], [14.7545, 47.6965], [8.4445, 46.813], [-96.9935, 28.8169], [14.7545, 47.6965], [8.4445, 46.813], [-99.1329, 19.4319], [-99.1329, 19.4319], [14.7545, 47.6965], [8.4445, 46.813], [-95.6969, 29.9689], [-99.1329, 19.4319], [-87.6467131, 41.6100344], [14.7545, 47.6965], [8.4445, 46.813]];

function initMap(loc) {

    var latLong = new google.maps.LatLng(parseFloat(loc.lat), parseFloat(loc.lng));

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: latLong,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
    });

    for (var i = 20; i < 40; i++) {
        var latLong = new google.maps.LatLng(parseFloat(coords[i][0]), parseFloat(coords[i][1]));
        var marker = new google.maps.Marker({
            position: latLong,
            map: map
        });
    }

    // var marker = new google.maps.Marker({
    //     position: latLong,
    //     map: map
    // });

    return map;
}

function init(){
    var url_str = window.location.href;
    var url = new URL(url_str);
    var search_q = url.searchParams.get("search") || "Austin, TX";
    var input_box = document.getElementById('search');
    // input_box.value = search_q


    var map = geocode_map(search_q);
}

function geocode_map(string) {
    var geocoder = new google.maps.Geocoder();
    var lat;
    var lng;
    return geocoder.geocode({'address': string}, function(results, status){
        console.log('geocode status:', status);
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        console.log(string,"=>",lat,lng);
        var location = {lat: lat, lng: lng};
        initMap(location);
        return location;
    });
}

function search(){
    var url_str = window.location.href;
    var url = new URL(url_str);
    var search = url.searchParams.get("search");

    console.log(search);
    /* DO ANY VALIDATION HERE */
    var map = initMap(search);

}

// google.maps.event.addDosmListener(window, "load", init);
var form = document.getElementById('form');
form.addEventListener("submit", search);
init();
