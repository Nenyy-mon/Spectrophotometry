
const csvUrl = "https://raw.githubusercontent.com/Nenyy-mon/spektrofometrija-csv/main/spektro2m.csv";
let data;
data = d3.csv(csvUrl, (d) => {
    return {
        day: +d.day,
        kontrola: +d.kontrola,
        conc6_25: +d.conc6_25,
        conc12_5: +d.conc12_5,
        conc25: +d.conc25,
        conc50: +d.conc25

    };
}).then((data) => {
    console.log(data)


    var days = [...new Set(data.map(function (d) {
        return d.day
    }))];
    console.log(days)

    const height = 570
    const width = 1560;

    const margin = {
        top: 20,
        bottom: 20,
        right: 20,
        left: 20
    }
    const innerHeight = height - (margin.top + margin.bottom)
    const innerWidth = width - 600

    const x = d3.scaleLinear()
        .domain(d3.extent(days, function (d) { return d }))
        .range([50, innerWidth])



    const bottomScale = d3.select("svg")
        .append("g")
        .attr("width", innerWidth)
        .attr("transform", `translate(0, ${height - 60})`)
    bottomScale
        .call(d3.axisBottom(x))
    const svg = d3.select('svg')
        .attr("width", width)
        .attr('class', "first")
        .attr("height", height)
        .attr("style", "width: 100%; height: 10%; font: 10px sans-serif;")


    const y = d3.scaleLinear([d3.max(data)])
        .range([innerHeight, 40])
    const leftScale = d3.select("svg")
        .append("g")
        .attr("height", innerHeight - 70)
        .attr("transform", `translate( ${margin.left + 30}, -20)`)
    leftScale
        .call(d3.axisLeft(y));

    const curveKont = d3.line()
        .x(function (d) { return x(d.day) })
        .y(function (d) { return y(d.kontrola / 15) })
        .curve(d3.curveNatural);

    const curve625 = d3.line()
        .x(function (d) { return x(d.day) })
        .y(function (d) { return y(d.conc6_25 / 15) })
        .curve(d3.curveNatural);

    const curve125 = d3.line()
        .x(function (d) { return x(d.day) })
        .y(function (d) { return y(d.conc12_5 / 15) })
        .curve(d3.curveNatural);


    const curve25 = d3.line()
        .x(function (d) { return x(d.day) })
        .y(function (d) { return y(d.conc25 / 15) })
        .curve(d3.curveNatural);

    const curve50 = d3.line()
        .x(function (d) { return x(d.day) })
        .y(function (d) { return y(d.conc50 / 15) })
        .curve(d3.curveNatural);


    svg.append("circle").attr("cx", 1040).attr("cy", 40).attr("r", 6).style("fill", "#A62B1F")
    svg.append("circle").attr("cx", 1040).attr("cy", 60).attr("r", 6).style("fill", "#D96941")
    svg.append("circle").attr("cx", 1040).attr("cy", 80).attr("r", 6).style("fill", "#214001")
    svg.append("circle").attr("cx", 1040).attr("cy", 100).attr("r", 6).style("fill", "#2E5902")
    svg.append("circle").attr("cx", 1040).attr("cy", 120).attr("r", 6).style("fill", "#193C40")
    svg.append("text").attr("x", 1050).attr("y", 40).text("Control").style("font-size", "15px").attr("alignment-baseline", "middle")
    svg.append("text").attr("x", 1050).attr("y", 60).text("Concentration 6.25").style("font-size", "15px").attr("alignment-baseline", "middle")
    svg.append("text").attr("x", 1050).attr("y", 80).text("Concentration 12.5").style("font-size", "15px").attr("alignment-baseline", "middle")
    svg.append("text").attr("x", 1050).attr("y", 100).text("Concentration 25").style("font-size", "15px").attr("alignment-baseline", "middle")
    svg.append("text").attr("x", 1050).attr("y", 120).text("Concentration 50").style("font-size", "15px").attr("alignment-baseline", "middle")



    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
        .attr("d", curveKont)
        .style("fill", "none")
        .style("stroke", "#A62B1F")
        .style("stroke-width", "2");

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
        .attr("d", curve625)
        .style("fill", "none")
        .style("stroke", "#D96941")
        .style("stroke-width", "2");

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("transform", "translate(" + 0 + "," + -10 + ")")
        .attr("d", curve125)
        .style("fill", "none")
        .style("stroke", "#214001")
        .style("stroke-width", "2");


    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("transform", "translate(" + 0 + "," + -10 + ")")
        .attr("d", curve25)
        .style("fill", "none")
        .style("stroke", "#2E5902")
        .style("stroke-width", "2");


    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("transform", "translate(" + 0 + "," + -15 + ")")
        .attr("d", curve50)
        .style("fill", "none")
        .style("stroke", "#193C40")
        .style("stroke-width", "2");


    svg.append("text")
        .text("Values")
        .attr("x", 190)
        .attr("transform", `rotate(90 -10 19)`)
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .style("font-family", "Jura");

    svg.append("text")
        .text("Days")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 20)
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .style("font-family", "Jura");

    svg.append("text")
        .text("Spectrophotometry")
        .attr("x", innerWidth / 2 - 100)
        .attr("y", 30)
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .style("font-family", "Jura");



    // // TOOLTIP


    // const circle = svg.append("circle")
    //     .attr("r", 0)
    //     .attr('fill', "green")
    //     .style('stroke', "green")
    //     .attr('opacity', .70)
    //     .style('pointer-events', 'none')
    // var tooltip = d3.select('body')
    //     .append('div')
    //     .attr('class', 'tooltip')

    // const listeningRect = svg.append('rect')
    //     .attr("width", width)
    //     .attr("height", height)

    // listeningRect.on("mousemove", function (event) {
    //     const [xCoord] = d3.pointer(event, this);
    //     const bisectDate = d3.bisector(d => d.day).left;
    //     const x0 = x.invert(xCoord);
    //     const i = bisectDate(data, x0, 1);
    //     const d0 = data[i - 1];
    //     const d1 = data[i];
    //     const d = x0 - d0.day > d1.day - x0 ? d1 : d0;
    //     const xPos = x(d.day);
    //     const yPos = y(d.value);
    //     circle.attr('cx', xPos)
    //         .attr("cy", yPos);
    //     circle.transition()
    //         .duration(50)
    //         .attr('r', 5)
    //     tooltip
    //         .style("display", "block")
    //         .style("left", `${xPos}px`)
    //         .style("top", `${yPos}px`)
    //         .html(`<strong>Day:</strong> ${d.day}<br><strong>Value:</strong> ${d.value}`)


    // })


})


