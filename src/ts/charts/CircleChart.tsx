import React, {useCallback, useEffect, useState} from "react";
import {Pie, PieChart, Sector} from "recharts";
import {useMostPopularDirection} from "@/api/mostPopularDirections/queries.ts";
import {CircularProgress} from "@mui/material";
import TitleChart from "@/ts/components/TitleChart.tsx";

import '@/less/charts.less';
import {MostPopularDirections} from "@/api/mostPopularDirections/types.ts";

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >{`L. studentów ${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const CircleChart = () => {
    const mostPopularDirections = useMostPopularDirection();
    const [chartData, setChartData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = useCallback((_event: React.MouseEvent<SVGSVGElement, MouseEvent>, index: number) => {
        setActiveIndex(index);
    }, [setActiveIndex]);

    useEffect(() => {
        if (mostPopularDirections.status === "success") {
            setChartData(mostPopularDirections.data.map((area: MostPopularDirections[]) => ({
                name: area.name,
                value: area.number_of_students
            })));
        }
    }, [mostPopularDirections.data]);

    if (mostPopularDirections.status === "loading") return <div><CircularProgress color={"secondary"} /></div>;
    if (mostPopularDirections.status === "error") return <h1>Error: {mostPopularDirections.error.message}</h1>;

    let title:string = 'Top 10 Kierunków';

    return (
        <>
        <TitleChart title={title} />
        <PieChart width={480} height={520} className="universal_chart">
            <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={chartData}
                cx={200}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
            />
        </PieChart>
        </>
    );
};

export default CircleChart;

