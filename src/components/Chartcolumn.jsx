// import { PieChart } from "react-google-charts";
import { Chart } from "react-google-charts";
import React, { useState } from "react";

function Chartcolumn() {
  const [tableVisible, setTableVisible] = useState(false);
  const [clickedData, setclickedData] = useState();
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
          // console.log(e.targetID);
          if (!["chart", "title", "legend"].includes(e.targetID)) {
            setclickedData(tableData[dataIndex][0]);
            setTableVisible(!tableVisible);
          }
        });
      },
    },
  ];

  return (
    <div>
      <Chart
        chartType="ColumnChart"
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
      {tableVisible && (
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Hours per Day</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Work</td>
              <td>11</td>
            </tr>
            <tr>
              <td>Eat</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Commute</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Watch TV</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Sleep</td>
              <td>7</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Chartcolumn;
