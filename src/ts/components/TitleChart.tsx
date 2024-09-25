import {TitleChartProps} from "@/ts/types/TitleChart.ts";

const TitleChart = ({ title }: TitleChartProps) => {
    return (
        <div className="title_chart">
            <h2>{title}</h2>
        </div>
    );
};

export default TitleChart;