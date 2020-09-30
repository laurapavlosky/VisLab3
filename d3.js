d3.csv('cities.csv', d3.autoType).then(data=>{
    
    data = data.filter(d=>d.eu===true);
    console.log('cities', data);

    d3.select('.city-count').text("Number of Cities: " + data.length);

    const width = 700;
    const height = 550;
    const svg = d3.select('.population-plot')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

    data.sort((a,b) => b.population - a.population);
    console.log('cities', data);

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        })
        .attr("r", function(d,i) {
            if (d.population < 1000000) { return 4;}
            else return 8;
        })
        .attr("fill", "#66ccff");
    
    data = data.filter(function(d) {
        return d.population >= 1000000;
    })  
 
 
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) {
            return d.country;
        })
        .attr("x", function(d) {
            return d.x;
        })
        .attr("y", function(d) {
            return d.y - 11;
        })
        .attr("font-size", "11px")
        .attr("text-anchor", "middle");
})

d3.csv('buildings.csv', d3.autoType).then(data => {

    data.sort((a,b) => b.height_ft - a.height_ft);

    const width = 500;
    const height = 500;
    const svg = d3.select('.building-height')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
    
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", 220)
        .attr("y", function(d,i) {
            return i *32;
        })
        .attr("width", function(d) {
            return d.height_px;
        })
        .attr("height", 30)
        .attr("fill", "#ff8c1a")
        .on("click",function(d,i)  {
            d3.select('.image').attr('src', "img/" + i.image);
            d3.select('.building-name').text(i.building);
            d3.select('.height').text(i.height_ft);
            d3.select('.city').text(i.city);
            d3.select('.country').text(i.country);
            d3.select('.floors').text(i.floors);
            d3.select('.completed').text(i.completed);
            
        });

     
    svg.selectAll("text.title")
        .data(data)
        .enter()
        .append("text")
        .text(function (d) {
            return d.building;
        })
        .attr("x", 0)
        .attr("y", function(d,i) {
            return i*32 + 18;
        })
        .attr("font-size", 15);

    svg.selectAll("text.value")
        .data(data)
        .enter()    
        .append("text")
        .text(function (d) {
            return d.height_ft + " ft";
        })
        .attr("x", function(d) {
            return d.height_px + 163;
        })
        .attr("y", function(d,i) {
            return i*32 + 20;
        })
        .attr("fill", "white")
        .attr("font-size", 15);




})
