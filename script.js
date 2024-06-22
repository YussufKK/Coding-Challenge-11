const data = [100, 420, 230, 850, 560, 925];
const margin = 1;
const barWidth = 40;
const width = data.length * (barWidth + margin);
const height = 500;

const svg = d3.select("#chart")
    .attr("width", width)
    .attr("height", height);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([height - 50, 50]);

const bars = svg.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(${i * (barWidth + margin)}, 0)`);

bars.append("rect")
    .attr("class", "bar")
    .attr("width", barWidth)
    .attr("height", 0)
    .attr("y", height - 50)
    .transition()
    .duration(1000)
    .attr("y", d => yScale(d))
    .attr("height", d => height - 50 - yScale(d));

bars.append("text")
    .attr("class", "label")
    .attr("x", barWidth / 2)
    .attr("y", height - 55)
    .transition()
    .duration(1000)
    .attr("y", d => yScale(d) - 5)
    .text(d => d);
    
bars.select("rect")
    .on("mouseover", function () {
        d3.select(this).transition().duration(200).attr("fill", "orange");
    })
    .on("mouseout", function () {
        d3.select(this).transition().duration(200).attr("fill", "steelblue");
    });
