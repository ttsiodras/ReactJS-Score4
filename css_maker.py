#!/usr/bin/env python2
#
# I hate CSS. Really!

template = open("html/matrix.css.template").read()
o = open("html/matrix.css", "w")
for viewport_size in xrange(100, 5000, 100):
    viewport_size_p100 = viewport_size + 99
    tile_size = int(viewport_size/20.)
    tile_size_p5 = tile_size + 5
    tile_size_p4 = tile_size + 4
    o.write(
        template % {
            "viewport_size": viewport_size,
            "viewport_size_p100": viewport_size_p100,
            "tile_size": tile_size,
            "tile_size_p5": tile_size_p5,
            "tile_size_p4": tile_size_p4
        }
    )

