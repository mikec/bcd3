SETUP
------------

install [node.js](http://nodejs.org)

download and run [neo4j](http://neo4j.org). It will run on http://localhost:7474 by default. 

`npm install -g nodemon`

cd to the bcd3 dir

`npm install`


RUN
---

`sudo sh start.sh` to start the server.js node server with the correct env vars

run `sudo sh get-data.sh` to generate sample data in neo4j

browse to `http://localhost:9494`. this should show 4 dots connected to each other (1 block, connected to 3 addresses)

browse to `http://localhost:9494/sample`. this should show the sample data from the /webapp/public/js/sample.json file. same as this [d3 example](http://bl.ocks.org/mbostock/4062045)


