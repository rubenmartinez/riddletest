

// assumeEarthRadius as:  <--- real mean radius = 6,371km

// scaleFactor

// path south distance?
// starting point distance?

var pathColor = '#f22';
var pathLineWidth = 2;
var pathCircleWidth = 1;

Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};


var southPointLineString;
var horizontalCircleLineString;

var app = new Vue({
    el: '#controls',
    data: {
        assumedEarthRadius: 1,
        distanceSouth: 0.1599,
        distanceSouthAlert: false,
        scaleFactor: 0.9
    },
    computed: {
        circleDistance: function() {
            return 2 * Math.PI * this.getInnerCircleRadius(this.getAngleFromNorthPoleRadians());
        },
        southLatitude: function() {
            return 90 - Math.degrees( this.getAngleFromNorthPoleRadians() );
        },
        southPointLineString: function() {
            return {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [[0, 90], [0, this.southLatitude]]
                }
            }
        },
        horizontalCircleLineString: function() {
            return {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": this.getHorizontalCircleCoordinates(this.southLatitude)
                }
            }
        }
    },
    watch: {
        scaleFactor: function() {
            scaleFactor = this.scaleFactor;
            scale();
        },
        distanceSouth: function() {
            this.validateDistanceSouth();
        },
        assumedEarthRadius: function() {
            this.validateDistanceSouth();
        }
    },
    methods: {
        fillEarthRadius: function() {
            this.assumedEarthRadius = 3960;
        },
        getAngleFromNorthPoleRadians: function() {
            return this.distanceSouth / this.assumedEarthRadius;;
        },
        getInnerCircleRadius: function (angleFromNorthPoleRadians) {
            return Math.sin(angleFromNorthPoleRadians)*this.assumedEarthRadius;

        },
        getHorizontalCircleCoordinates: function (latitude) {
            coordinates = [];
            for (var i=-180; i<180; i+=.1) {
                coordinates.push([i, latitude]);
            }
            return coordinates;
        },
        validateDistanceSouth: function () {
            maxDistanceSouth = this.assumedEarthRadius * Math.PI / 2;
            threshold = maxDistanceSouth * .01;
            if (this.distanceSouth > maxDistanceSouth - threshold) {
                this.distanceSouth = maxDistanceSouth - threshold;
                this.distanceSouthAlert = true;
            }
            else if (this.distanceSouth < maxDistanceSouth - 2 * threshold) {
                this.distanceSouthAlert = false;
            }
        }
    }
})

function externalRender() {
    if (app.southPointLineString) {
        stroke(app.southPointLineString, pathColor, pathLineWidth);
    }
    if (app.horizontalCircleLineString) {
        stroke(app.horizontalCircleLineString, pathColor, pathCircleWidth);
    }
}
