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

    var marker = new google.maps.Marker({
        position: latLong,
        map: map
    });

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
