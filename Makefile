all:
	make -C src/components || exit 1
	cd html/ && python2 -m SimpleHTTPServer
