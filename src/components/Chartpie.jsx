// import { PieChart } from "react-google-charts";
import { Chart } from "react-google-charts";
import React from "react";

const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

function Chartpie() {
  // const handleSelect = (event) => {
  //   console.log(event.targetID);
  // };

  const chartEvents = [
    {
      eventName: "select",
      callback({ chartWrapper }) {
        let selection = chartWrapper.getChart().getSelection()[0];
        let chart = chartWrapper.getChart();
        let ss = chart.getSelection();
        console.log(ss[0].row);
        // console.log(chartWrapper);

        if (ss[0].row === 0) {
          console.log(
            chartWrapper.Bea.Wf[0].c[0].v,
            chartWrapper.Bea.Wf[0].c[1].v
          );
        } else if (ss[0].row === 1) {
          console.log(
            chartWrapper.Bea.Wf[1].c[0].v,
            chartWrapper.Bea.Wf[1].c[1].v
          );
        } else if (ss[0].row === 2) {
          console.log(
            chartWrapper.Bea.Wf[2].c[0].v,
            chartWrapper.Bea.Wf[2].c[1].v
          );
        } else if (ss[0].row === 3) {
          console.log(
            chartWrapper.Bea.Wf[3].c[0].v,
            chartWrapper.Bea.Wf[3].c[1].v
          );
        } else if (ss[0].row === 4) {
          console.log(
            chartWrapper.Bea.Wf[4].c[0].v,
            chartWrapper.Bea.Wf[4].c[1].v
          );
        } else if (ss[0].row === 5) {
          console.log(
            chartWrapper.Bea.Wf[5].c[0].v,
            chartWrapper.Bea.Wf[5].c[1].v
          );
        }

        // if (selection) {
        //   let nodeId = data[selection.row + 1][0].v;
        //   console.log("selection found");
        // } else {
        //   console.log("no selection");
        // }
      },
    },
  ];
  return (
    <div>
      <Chart
        chartType="PieChart"
        width={"500px"}
        height={"300px"}
        data={data}
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
