// import { PieChart } from "react-google-charts";
import { Chart } from "react-google-charts";
import React, { useState } from "react";

function Testfile() {
  const [selectedCountries, setSelectedCountries] = useState([]);

  const data = [
    ["Country", "Popularity"],
    ["Germany", 700],
    ["United States", 700],
    ["Brazil", 700],
    ["Canada", 700],
    ["France", 700],
    ["RU", 700],
    ["India", 700],
  ];

  const countries = new Set(data.slice(1).map((row) => row[0]));

  const filteredData =
    selectedCountries.length === 0
      ? data
      : [
          ["Country", "Popularity"],
          ...data.slice(1).filter((row) => selectedCountries.includes(row[0])),
        ];

  const chartEvents = [
    {
      eventName: "ready",
      callback: ({ chartWrapper, google }) => {
        const chart = chartWrapper.getChart();
        google.visualization.events.addListener(chart, "select", function () {
          const selectedItem = chart.getSelection()[0];
          if (selectedItem) {
            const country = data[selectedItem.row + 1][0];
            const popularity = data[selectedItem.row + 1][1];
            // console.log(country, popularity);
          }
        });
      },
    },
  ];

  return (
    <div>
      <select
        multiple
        value={selectedCountries}
        onChange={(e) =>
          setSelectedCountries(
            [...e.target.selectedOptions].map((option) => option.value)
          )
        }
      >
        {Array.from(countries).map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <Chart
        chartType="GeoChart"
        data={filteredData}
        rootProps={{ "data-testid": "1" }}
        options={{
          colorAxis: { colors: ["#00853f", "black", "#FFE600"] },
          backgroundColor: "lightblue",
          datalessRegionColor: "black",
          //   displayMode: "markers",
          legend: "none",
        }}
        chartEvents={chartEvents}
      />
    </div>
  );
}

export default Testfile;
