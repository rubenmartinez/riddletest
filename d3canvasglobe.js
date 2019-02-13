// Code adapted from https://jorin.me/d3-canvas-globe-hover/

//
// Configuration
//

// ms to wait after dragging before auto-rotating
var rotationDelay = 1000
// scale of the globe (not the canvas element)
var scaleFactor = 0.9
// autorotation speed
var degPerSec = 6
// start angles
var angles = { x: -20, y: 40, z: 0 }
// colors
var colorWater = '#fff'
var colorLand = '#111'
var colorGraticule = '#ccc'
var colorCountry = '#a00'


//
// Variables
//
var canvas = d3.select('#globe')
var context = canvas.node().getContext('2d')
var water = { type: 'Sphere' }
var projection = d3.geoOrthographic().precision(0.1)
var graticule = d3.geoGraticule10()
var path = d3.geoPath(projection).context(context)
var v0 // Mouse position in Cartesian coordinates at start of drag gesture.
var r0 // Projection rotation as Euler angles at start.
var q0 // Projection rotation as versor at start.
var lastTime = d3.now()
var degPerMs = degPerSec / 1000
var width, height
var land, countries
var countryList
var autorotate, now, diff, roation
var currentCountry

//
// Functions
//

function setAngles() {
    var rotation = projection.rotate()
    rotation[0] = angles.y
    rotation[1] = angles.x
    rotation[2] = angles.z
    projection.rotate(rotation)
}

function scale() {
    projection
        .scale((scaleFactor * Math.min(width, height)) / 2)
        .translate([width / 2, height / 2])
    render()
}

function resize() {
    width = document.documentElement.clientWidth
    height = document.documentElement.clientHeight
    canvas.attr('width', width).attr('height', height)
    projection
        .scale((scaleFactor * Math.min(width, height)) / 2)
        .translate([width / 2, height / 2])
    render()
}

function startRotation(delay) {
    autorotate.restart(rotate, delay || 0)
}

function stopRotation() {
    autorotate.stop()
}

function dragstarted() {
    v0 = versor.cartesian(projection.invert(d3.mouse(this)))
    r0 = projection.rotate()
    q0 = versor(r0)
    stopRotation()
}

function dragged() {
    var v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(this)))
    var q1 = versor.multiply(q0, versor.delta(v0, v1))
    var r1 = versor.rotation(q1)
    projection.rotate(r1)
    render()
}

function dragended() {
    startRotation(rotationDelay)
}

function render() {
    context.clearRect(0, 0, width, height)
    fill(water, colorWater)
    stroke(graticule, colorGraticule)
    fill(land, colorLand)
    if (currentCountry) {
        fill(currentCountry, colorCountry)
    }
    externalRender();
}

function fill(obj, color) {
    context.beginPath()
    path(obj)
    context.fillStyle = color
    context.fill()
}

function stroke(obj, color, lineWidth) {
    context.beginPath()
    path(obj)
    context.strokeStyle = color
    if (lineWidth) {
        context.lineWidth = lineWidth;
    }
    else {
        context.lineWidth = 1;
    }
    context.stroke()
}

function rotate(elapsed) {
    now = d3.now()
    diff = now - lastTime
    if (diff < elapsed) {
        rotation = projection.rotate()
        rotation[0] += diff * degPerMs
        projection.rotate(rotation)
        render()
    }
    lastTime = now
}

function loadData(cb) {
    d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function (error, world) {
        if (error) throw error
        d3.tsv('https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/world-country-names.tsv', function (error, countries) {
            if (error) throw error
            cb(world, countries)
        })
    })
}


//
// Initialization
//

setAngles()

canvas
    .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    )

loadData(function (world, cList) {
    land = topojson.feature(world, world.objects.land)

    window.addEventListener('resize', resize)
    resize()
    autorotate = d3.timer(rotate)    
})
