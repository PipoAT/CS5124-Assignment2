class LineChart {

  constructor(_config, _data) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 500,
      containerHeight: _config.containerHeight || 140,
      margin: { top: 10, bottom: 30, right: 10, left: 30 }
    }

    this.data = _data;

    // Call a class function
    this.initVis();
  }

  initVis() {
    const vis = this;

    // Define the width and height of the chart area
    vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
    vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

    // Create an SVG element and append a group element
    vis.svg = d3.select(vis.config.parentElement)
        .append('svg')
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight)
        .append('g')
        .attr('transform', `translate(${vis.config.margin.left}, ${vis.config.margin.top})`);

    // Define scales
    vis.xScale = d3.scaleLinear()
        .domain(d3.extent(vis.data, d => d.year)) // [minYear, maxYear]
        .range([0, vis.width - 100]);

    vis.yScale = d3.scaleLinear()
        .domain([0, d3.max(vis.data, d => d.cost)]) // [0, maxCost]
        .range([vis.height, 0]);

    // Define axes
    vis.xAxis = d3.axisBottom(vis.xScale).ticks(5).tickFormat(d3.format('d')); // Display as integers
    vis.yAxis = d3.axisLeft(vis.yScale).ticks(5);

    // Append axes groups
    vis.xAxisGroup = vis.svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${vis.height})`);

    vis.yAxisGroup = vis.svg.append('g')
        .attr('class', 'y-axis');

    // Define the line generator
    vis.line = d3.line()
        .x(d => vis.xScale(d.year))
        .y(d => vis.yScale(d.cost));

    // Append the line path
    vis.svg.append('path')
        .datum(vis.data)
        .attr('class', 'line')
        .attr('d', vis.line)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2);

    // Render axes
    vis.xAxisGroup.call(vis.xAxis);
    vis.yAxisGroup.call(vis.yAxis);
}

 //  //leave this empty for now
 // updateVis() { 
   
 //   this.renderVis(); 

 // }


 // //leave this empty for now...
 // renderVis() { 

 //  }

}