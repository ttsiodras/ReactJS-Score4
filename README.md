Introduction
============
[Blog post about this code can be read here](http://users.softlab.ntua.gr/~ttsiod/score4jsreact.html).

I finally found some time to play with ReactJS... and to make it
even more interesting, I added TypeScript to the mix,.. and ported
my [Score4](http://users.softlab.ntua.gr/~ttsiod/score4js.html)
Javascript game to ReactJS.

The result? Awesome, state-driven rendering of the tiles (using
CSS for everything, abandoned Canvas and silly edge detections).

Overall, very happy with the result! :-)

Installation
============
You need a really recent TypeScript - I used...

    $ npm install typescript@next

...to get:

    $ npm list | grep typescript
    typescript@1.6.0-dev.20150905

After that, just...

    cd ReactJS-Score4
    make

This will use your Python installation to serve the resulting files
from [http://localhost:8000](http://localhost:8000) ; go there and
play the game!

The page shown is actually the page from my blog - so the links
in there will only work properly viewed from 
[here](http://users.softlab.ntua.gr/~ttsiod/score4jsreact.html).
Still, you can play the game by simply navigating to the bottom of that page.

Enjoy!
