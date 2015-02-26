function MapComponent(top) {
	this.view = this.createMapView(top);
}

MapComponent.prototype.createMapView = function(top) {
	var startLat = 42.3520314;
    var startLong = -71.1255678;
	var delta = 0.005;

	return MapModule.createView({
		mapType: MapModule.NORMAL_TYPE,
	    animate:true,
	    regionFit:true,
	    region: {latitude:startLat, longitude:startLong, latitudeDelta: delta, longitudeDelta: delta},
	    top: top,
	    height: Constants.deviceHeight - top
	});
};

MapComponent.prototype.decodePolyline = function(encoded, polyline_steps_arr) {
	var len = encoded.length;
    var index = 0;
    var lat = 0;
    var lng = 0;
 
    while(index < len) {
        var b;
        var shift = 0;
        var result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += dlat;
 
        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += dlng;
 
        // Create new Vars for the created lats and lng
        var newLat = lat * 1e-5;
        var newLon = lng * 1e-5;
 
        // push them into the array at the end (thus adding it to the correct place)
        polyline_steps_arr.push({
            latitude: newLat,
            longitude: newLon
        });
    }
}

module.exports = MapComponent;