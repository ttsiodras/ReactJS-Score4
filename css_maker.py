#!/usr/bin/env python2
#
# I hate CSS. Really!

template = open("html/matrix.css.template").read()
o = open("html/matrix.css", "w")
for viewport_size in xrange(100, 900, 100):
    viewport_size_p100 = viewport_size + 99
    tile_size = int(viewport_size / 20.)
    tile_size_p5 = tile_size + 5
    tile_size_p4 = tile_size + 4
    data = {
        "minwidth": "(min-width: %dpx)" % viewport_size
    }
    if viewport_size < 800:
        data.update({
            "maxwidth": "and (max-width: %dpx)" % viewport_size_p100
        })
    elif viewport_size == 800:
        data.update({"maxwidth": ""})
    data.update({
        "tile_size": tile_size,
        "tile_size_p5": tile_size_p5,
        "tile_size_p4": tile_size_p4
    })
    o.write(template % data)
