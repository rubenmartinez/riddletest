import math
from math import pi

global_r = 0.7387516


def get_angle_from_surface_distance_from_north_pole(distance):
    # max distance that can be travelled till returning to north pole is 2*pi*r, that angle is 2pi radians (full circumference)
    # so the angle for a given distance, assuming that distance is less than 2*pi*r, is distance/r
    return distance/global_r

def get_horizontal_circle_radius_from_surface_distance(distance_travelling_south_from_north_pole):
    angle = get_angle_from_surface_distance_from_north_pole(distance_travelling_south_from_north_pole)
    return global_r*math.cos(angle)

def horizontal_circle_perimeter(distance_travelling_south_from_north_pole):
    return 2*pi*get_horizontal_circle_radius_from_surface_distance(distance_travelling_south_from_north_pole)


angle = get_angle_from_surface_distance_from_north_pole(1)
print("angle: {} ({})".format(angle, math.degrees(angle)))
print(get_horizontal_circle_radius_from_surface_distance(1))
print(horizontal_circle_perimeter(1))
