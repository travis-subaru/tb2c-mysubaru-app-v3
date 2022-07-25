#!/bin/sh

# Size and colorize images
# Invoke as: sh helper/images.sh
# Grab dependancies on Mac: brew install librsvg
#
# Because of the added dependancy, this is not in the build process.
# Instead, update and re-run script as needed. Check results into source control.

# MySubaru logo
LOGO_SVG="content/mysubaru-logo.svg"
rsvg-convert -s 'content/mysubaru-logo-000000.css' -w 240 -h 83 'content/mysubaru-logo.svg' -o 'assets/images/mysubaru-logo-black.png'
rsvg-convert -s 'content/mysubaru-logo-ffffff.css' -w 240 -h 83 'content/mysubaru-logo.svg' -o 'assets/images/mysubaru-logo-white.png'
