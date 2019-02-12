

// assumeEarthRadius as:  <--- real mean radius = 6,371km

// scaleFactor

// path south distance?
// starting point distance?

var pathColor = '#f22';
var pathLineWidth = 2;

var point = {
    "type": "Feature",
    "geometry": {
        "type": "LineString",
        "coordinates": [[0, 0], [90, 90]]
    }
}

function externalRender() {
    stroke(point, pathColor, pathLineWidth);
}

// lat1=0;
// lat2=90;
// lon1=0;
// lon2=90;

// JavaScript:
// var R = 6371e3; // metres
// var φ1 = lat1.toRadians();
// var φ2 = lat2.toRadians();
// var Δφ = (lat2 - lat1).toRadians();
// var Δλ = (lon2 - lon1).toRadians();

// var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//     Math.cos(φ1) * Math.cos(φ2) *
//     Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
// var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

// var d = R * c;

Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};
