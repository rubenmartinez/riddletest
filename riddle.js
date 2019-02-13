

// assumeEarthRadius as:  <--- real mean radius = 6,371km

// scaleFactor

// path south distance?
// starting point distance?

var pathColor = '#f22';
var pathLineWidth = 2;

Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};


var southPoint;

var app = new Vue({
    el: '#controls',
    data: {
        assumedEarthRadius: 3960,
        distanceSouth: 1,
        scaleFactor: 0.9
    },
    computed: {
        circleDistance: function() {
            return 123;
        },
        southLat: function() {
            return this.angleFromNorthPole();
        },
        southPoint: function() {
            return {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [[0, 90], [0, this.southLat]]
                }
            }
        }
    },
    watch: {
        scaleFactor: function() {
            scaleFactor = this.scaleFactor;
            scale();
        }
    },
    methods: {
        fillEarthRadius: function() {
            this.assumedEarthRadius = 3960;
        },
        angleFromNorthPole: function() {
            return 90-Math.degrees(this.distanceSouth / this.assumedEarthRadius);
        }
    }
})

function externalRender() {
    if (app.southPoint) {
        stroke(app.southPoint, pathColor, pathLineWidth);
    }
}
