// import { PieChart } from "react-google-charts";
import { Chart } from "react-google-charts";
import React, { useState } from "react";

function Testfile() {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedRawCountries, setSelectedRawCountries] = useState([]);

  const data = [
    ["Country", "Popularity"],
    ["Germany", 700],
    ["IMEA", 700],
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

  function replaceIMEA(countries) {
    const imeaIndex = countries.indexOf("IMEA");
    if (imeaIndex !== -1) {
      countries = countries.filter((item) => item !== "IMEA");
      countries.push("United States", "India", "France");
    }
    return countries;
  }

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
            console.log(country, popularity);
          }
        });
      },
    },
  ];

  console.log(replaceIMEA(selectedCountries));
  console.log(filteredData);
  console.log("selectedCountries");
  console.log(selectedCountries);

  return (
    <div>
      <div>
        <select
          multiple
          value={selectedCountries}
          onChange={(e) => {
            setSelectedCountries(
              replaceIMEA(
                [...e.target.selectedOptions].map((option) => option.value)
              )
            );
            setSelectedRawCountries();
          }}
        >
          {Array.from(countries).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div>
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
          width="100%"
          height="1000px"
        />
      </div>
    </div>
  );
}

export default Testfile;
