import { useState, useEffect } from "react";
import api from "../../services/api";

function GraphPage(props) {
    const [sortedClosePrices, setSortedClosePrices] = useState([]);

    const{
        currentDate,
        companyId
    }=props;

    // function that calls db query (input: currentDate, companyId) 
    // output: 2 lists of all values from (currentDate - year) to currentDate
    
    useEffect(() => {
        api.get() // I will implement later no need to touch
        .then(res => {setSortedClosePrices(res.data)})
        .catch(err => console.error(err));
    }, [])

    // second function that generates a graph from those of 2 lists

    const generateGraph = () => {
        if (!sortedClosePrices || sortedClosePrices.length === 0) {
            return <div>No data available</div>
        }

        const width = 600;
        const height = 400;
        const padding = 50;

        const values = sortedClosePrices;
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const valueRange = maxValue - minValue;

        const points = values.map((value, index) => {
            const x = padding + (index / (values.length - 1)) * (width - 2 * padding);
            const y = height - padding - ((value - minValue) / valueRange) * (height - 2 * padding);
            return `${x},${y}`;
        }).join(" ");

        const xAxisLabels = values
            .filter((_, index) => index % Math.ceil(values.length / 5) === 0)
            .map((_, index) => {
                const positionIndex = index * Math.ceil(values.length / 5);
                const x = padding + (positionIndex / (values.length - 1)) * (width - 2 * padding);
                return (
                    <text key={index} x={x} y={height - 1} textAnchor="middle" fontSize="12">
                        Day {positionIndex + 1}
                    </text>
                );
            });

        const yAxisLabels = [];
        const numYLabels = 5;
        for (let i = 0; i <= numYLabels; i++) {
            const value = minValue + (i / numYLabels) * valueRange;
            const y = height - padding - (i / numYLabels) * (height - 2 * padding);
            yAxisLabels.push(
                <text key={i} x={padding - 10} y={y + 3} textAnchor="end" fontSize="12">
                    {value.toFixed(2)}
                </text>
            );
        }

        return (
            <svg width={width} height={height} style={{border: "1px solid #ccc"}}>
                <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="black"/>
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="black"/>

                <polyline points={points} fill="none" stroke="black" strokeWidth="2"/>

                {points.split(" ").map((point, index) => {
                    const [x, y] = point.split(",").map(Number);
                    return (
                        <circle key={index} cx={x} cy={y} r="3" fill="red"/>
                    );
                })}

                {xAxisLabels}
                {yAxisLabels}

                <text x={width / 2} y={height - 15} textAnchor="middle" fontSize="14">
                    Date
                </text>
                <text x={15} y={height / 2} textAnchor="middle" fontSize="14" transform={`rotate(-90, 15, ${height / 2})`}>
                    Price
                </text>
            </svg>
        );
    };

    return(
        <div>
            {generateGraph()}
        </div>
    )
}

export default GraphPage;