function renderD3(useSampleData) {

    var width = 960,
        height = 500;

    var color = d3.scale.category20();

    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .size([width, height]);

    var svg = d3.select("#block_data").append("svg")
        .attr("width", width)
        .attr("height", height);

    if(useSampleData) {
        // gets data from sample.json
        d3.json('js/sample.json', function(error, resp) {
            addData(resp);
        });
    } else {
        // gets data from the graphsvc service (neo4j)
        d3.xhr('/blocks/1DKWD5VVDH?include=addresses', function(error, resp) {
            var rawData = JSON.parse(resp.response);

            var graph = { nodes: [], links: [] };

            // get the block that we requested, add to the d3 graph
            var b = { id: rawData.id };
            graph.nodes.push(b);

            // get the addresses attached to this block, add nodes
            // and relationships for them in the d3 graph
            for(var i in rawData.addresses.data) {
                var a = rawData.addresses.data[i];
                graph.nodes.push(a);
                graph.links.push({
                    "source":0,
                    "target":(parseInt(i)+1),
                    "value":1
                });
            }
            addData(graph)
        });
    }

    function addData(graph) {
      force
          .nodes(graph.nodes)
          .links(graph.links)
          .start();

      var link = svg.selectAll(".link")
          .data(graph.links)
        .enter().append("line")
          .attr("class", "link")
          .style("stroke-width", function(d) { return Math.sqrt(d.value); });

      var node = svg.selectAll(".node")
          .data(graph.nodes)
        .enter().append("circle")
          .attr("class", "node")
          .attr("r", 5)
          .style("fill", function(d) { return color(d.group); })
          .call(force.drag);

      node.append("title")
          .text(function(d) { return d.name; });

      force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
      });
    }

}