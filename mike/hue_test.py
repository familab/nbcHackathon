#!/usr/bin/python
from phue import Bridge
import random
import time

b = Bridge("10.0.1.2") # Enter bridge IP here.

#If running for the first time, press button on bridge and run with b.connect() uncommented
#b.connect()

lights = b.get_light_objects()

color_list = [25653, 41613, 63155]

rnd_color = random.randrange(0,2+1)

light_settings = {'bri' : 254, 'hue' : color_list[rnd_color], 'on' : True, 'transitiontime' : 0}
last_light = 1
for x in range(0, 10):
        rnd_light = random.randrange(1,3+1)    
    
        b.set_light(rnd_light, light_settings)
        
        b.set_light(last_light, 'on', False, transitiontime=0)
        
        last_light = rnd_light

for z in range(0, 3):
        b.set_light([1, 2, 3], 'on', False, transitiontime=0)

      
print rnd_color

