

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


var southPoint;

var app = new Vue({
    el: '#controls',
    data: {
        assumedEarthRadius: 3960,
        distanceSouth: 1,
        distanceSouthAlert: false,
        scaleFactor: 0.9
    },
    computed: {
        circleDistance: function() {
            return 123;
        },
        southLatitude: function() {
            return 90 - Math.degrees( this.angleFromNorthPoleRadians() );
        },
        southPoint: function() {
            return {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [[0, 90], [0, this.southLatitude]]
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
            maxDistanceSouth = this.assumedEarthRadius * Math.PI / 2;
            threshold = maxDistanceSouth*.01;
            if (this.distanceSouth > maxDistanceSouth - threshold) {
                this.distanceSouth = maxDistanceSouth - threshold;
                this.distanceSouthAlert = true;
            }
            else if (this.distanceSouth < maxDistanceSouth - 2*threshold) {
                this.distanceSouthAlert = false;
            }
        }
    },
    methods: {
        fillEarthRadius: function() {
            this.assumedEarthRadius = 3960;
        },
        angleFromNorthPoleRadians: function() {
            return this.distanceSouth / this.assumedEarthRadius;;
        },
        innerCircleRadius: function() {
            
        }
    }
})

function externalRender() {
    if (app.southPoint) {
        stroke(app.southPoint, pathColor, pathLineWidth);
    }
}
