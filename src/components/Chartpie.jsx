// import { PieChart } from "react-google-charts";
import { Chart } from "react-google-charts";
import React from "react";

function Chartpie() {
  const chartData = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];
  const chartEvents = [
    {
      eventName: "ready",
      callback: ({ chartWrapper, google }) => {
        const chart = chartWrapper.getChart();
        google.visualization.events.addListener(chart, "click", (e) => {
          const dataIndex = e.targetID.slice(e.targetID.lastIndexOf("#") + 1);
          const tableData = chartData.slice(1);
          if (e.targetID !== "chart") {
            console.log(tableData[dataIndex][0]);
          }
        });
      },
    },
  ];
  // slice#0
  return (
    <div>
      <Chart
        chartType="PieChart"
        width={"500px"}
        height={"300px"}
        data={chartData}
        options={{
          title: "My Daily Activities",
          is3D: true,
          titlePosition: "center",
          pieSliceText: "label",
          backgroundColor: "transparent",
          legend: {
            textStyle: {
              fontName: "Arial",
              fontSize: 14,
              color: "#848484",
            },
          },
          titleTextStyle: {
            fontName: "Arial",
            fontSize: 18,
            bold: true,
            // italic: true,
            color: "#848484",
            // auraColor: "#d799ae",
          },
        }}
        chartEvents={chartEvents}
      />
      <div id="table"></div>
    </div>
  );
}

export default Chartpie;
