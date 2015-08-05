
var dogPark = {};

dogPark.init = function() {
	navigator.geolocation.getCurrentPosition(function(success) {
		dogPark.Lat = success.coords.latitude;
		dogPark.Lon = success.coords.longitude;
		console.log("lat " + dogPark.Lat);
		console.log("lon " + dogPark.Lon);
	});

	// dogPark.Lat = 43.8643299;
	// dogPark.Lon = -79.5398268;

	$('.distanceForm').on('submit', function(e){
	e.preventDefault();
	var distance = $('.distance').val();
	console.log("distance " + distance);
	dogPark.getPark(dogPark.Lat, dogPark.Lon, distance);

	});
};


dogPark.getPark = function (lat, lon, distance) {
	$.ajax({
		url:'https://api.foursquare.com/v2/venues/explore',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			client_id: 'EN1O22FKGYHJEKQQRGJLZGI0U4XMB202LPEGALT0CZGCV41F',
			client_secret: 'KOMUBVAVWUJE1WOIHQZ0YN2MVSLP03RIZP3Z1R0A00GR5OIS',
			v: '20160717',
			ll: lat + "," + lon,
			limit: 4,
			query: 'dog park',
			radius: distance

		},
		success: function(haris) {
		console.log(haris.response.groups[0].items);
		dogPark.allParks = haris.response.groups[0].items;
		
		dogPark.showPark();
		}

	});
};

dogPark.showPark = function () {
	$.each (dogPark.allParks, function(currentIndex, currentValue){
		console.log(currentValue.venue.name);
		console.log(currentValue.venue.location.address);
	});
};


$(function() {
	dogPark.init();
});
var dogPark = {};

dogPark.init = function() {
	navigator.geolocation.getCurrentPosition(function(success) {
		dogPark.Lat = success.coords.latitude;
		dogPark.Lon = success.coords.longitude;
		console.log("lat " + dogPark.Lat);
		console.log("lon " + dogPark.Lon);
	});

	$('.distanceForm').on('submit', function(e){
	e.preventDefault();
	var distance = $('.distance').val();
	console.log("distance " + distance);
	dogPark.createMap();
	dogPark.getPark(dogPark.Lat, dogPark.Lon, distance);

	});
};


dogPark.getPark = function (lat, lon, distance) {
	$.ajax({
		url:'https://api.foursquare.com/v2/venues/explore',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			client_id: 'EN1O22FKGYHJEKQQRGJLZGI0U4XMB202LPEGALT0CZGCV41F',
			client_secret: 'KOMUBVAVWUJE1WOIHQZ0YN2MVSLP03RIZP3Z1R0A00GR5OIS',
			v: '20160717',
			ll: lat + "," + lon,
			limit: 4,
			query: 'dog park',
			radius: distance

		},
		success: function(haris) {
		console.log(haris.response.groups[0].items);
		dogPark.allParks = haris.response.groups[0].items;
		
		dogPark.showPark();
		}

	});
};

dogPark.showPark = function () {
	$.each (dogPark.allParks, function(currentIndex, currentValue){
		// console.log(currentValue.venue.name);
		// console.log(currentValue.venue.location.address);
		// console.log(currentValue.venue.location.lat);
		// console.log(currentValue.venue.location.lng);
		// console.log('=================')
		// var tarah = $('<h2>').text(currentValue.venue.name);
		// $('.results').append(tarah);
		// var jo = $('<p>').text(currentValue.venue.location.address);
		// $('.results').append(jo);
		L.mapbox.featureLayer({
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [currentValue.venue.location.lng,currentValue.venue.location.lat]
			},
			properties: {
				'marker-color': '#006400',
				title: currentValue.venue.name,
				description: 'location: ' + currentValue.venue.location.address + ' | distance: ' + (currentValue.venue.location.distance /1000) + 'km',
				'marker-symbol': 'park',
				'marker-size': 'large'
			}
		}).addTo(dogPark.map);
	});

};

dogPark.createMap = function (){
	L.mapbox.accessToken = 'pk.eyJ1IjoidGFyYWhrZW5uZWR5IiwiYSI6IjQ2OWQ0MjQ4NjYwMWRhZDExNTBlOWEzNDU0OTE4YmU1In0.H5WWm7cKEKbErYGoOXU8Cw';
dogPark.map = L.mapbox.map('mapBox', 'mapbox.light')
    .setView([dogPark.Lat, dogPark.Lon], 4);
   


};

$(function() {
	dogPark.init();
});


