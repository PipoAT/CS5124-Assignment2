console.log("Hello world");

let data;
let years = []; 

// Margin object with properties for the four directions
const margin = {top: 40, right: 50, bottom: 10, left: 50};

// Width and height as the inner dimensions of the chart area
const width = 1000 - margin.left - margin.right;
const height = 1100 - margin.top - margin.bottom;


d3.csv('data/disasters.csv')
  .then(data => {
  	console.log('Data loading complete. Work with dataset.');
    console.log(data);

    // //DATA PROCESSING
    data.forEach( d => { //for each object in the array, pass it as a parameter to this function
      	d.cost = +d.cost; // convert string 'cost' to number
      	d.daysFromYrStart = computeDays(d.midpoint_date); //adding a parameter using a function to compute days

				let tokens = d.midpoint_date.split("-");
  			d.year = +tokens[0];

  	});

    drawChart(data);

})
.catch(error => {
    console.error('Error loading the data ' + error);
});


function drawChart(data){

	console.log("Let's draw a chart!!");
	

	// Define 'svg' as a child-element (g) from the drawing area and include spaces
	// Add <svg> element (drawing space)
	const svg = d3.select('body').append('svg')
	    .attr('width', width + margin.left + margin.right)
	    .attr('height', height + margin.top + margin.bottom)
	    .append('g')
	    .attr('transform', `translate(${margin.left}, ${margin.top})`);


	// TO DO-SCALES Initialize linear and ordinal scales (input domain and output range)
	// TO DO CREATE an xScale using d3.scaleLinear , with domain 0-365 and range 0-width
	const xScale = d3.scaleLinear()
		.domain([0, 365])
		.range([0, width]);

	xScale(365);
	// TO DO CREATE a yScale using d3.scaleLinear, with domain [ max year, min year] and range [0, height]  Note- why did I reverse the domain going from max to min? 
	const yScale = d3.scaleLinear()
		.domain([d3.max(data, d => d.year), d3.min(data, d => d.year)])
		.range([0, height])

	// TO DO CREATE an rScale using d3.scaleLinear, with domain the extent of the cost field in data, and range 5, 100
	//    note- remember there are calls d3.min, d3.max and d3.extent.  Check the tutorial for today
	const rScale = d3.scaleLinear()
		.domain(d3.extent(data, d => d.cost))
		.range([5, 100]);

	// Construct a new ordinal scale with a range of ten categorical colours
	const colorPalette = d3.scaleOrdinal(d3.schemeTableau10) //TRY OTHER COLOR SCHEMES.... https://github.com/d3/d3-scale-chromatic
	colorPalette.domain( "tropical-cyclone", "drought-wildfire", "severe-storm", "flooding" );

		//TO DO Initialize axes
        //  CREATE a top axis using your xScale)
        const xAxis = d3.axisTop(xScale); // Top axis using xScale
        //  CREATE a left axis using your yScale)
        const yAxis = d3.axisLeft(yScale); // Left axis using yScale

        //CREATE an xAxisGroup and append it to the SVG
        svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, 0)`) // Top of the chart area
            .call(xAxis);
        //CREATE a yAxisGroup and append it to the SVG
        svg.append('g')
            .attr('class', 'y-axis')
            .call(yAxis);

		//Add circles for each event in the data
		svg.selectAll('circle')
			.data(data)
			.enter()
		  .append('circle')
			.attr('fill', d => colorPalette(d.category)) // Use the color palette
			.attr('cx', d => xScale(d.daysFromYrStart)) // Use the xScale
			.attr('opacity', .8)
			.attr('stroke', "gray")
			.attr('stroke-width', 2)
			.attr('r', d => rScale(d.cost)) // Use the rScale
			.attr('cy', d => yScale(d.year)); // Use the yScale



}


function computeDays(disasterDate){
  	let tokens = disasterDate.split("-");

  	let year = +tokens[0];
  	let month = +tokens[1];
  	let day = +tokens[2];

    return (Date.UTC(year, month-1, day) - Date.UTC(year, 0, 0)) / 24 / 60 / 60 / 1000 ;

  }