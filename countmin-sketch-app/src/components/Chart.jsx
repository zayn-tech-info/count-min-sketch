import React from "react";
const Chart = ({ data }) => {
  if (!data || data.length === 0) return <p>No data to display</p>;
  const maxFreq = Math.max(...data.map((d) => d.frequency));
  const barHeight = 20;
  return (
    <div
      className="bg-white border rounded p-4 overflow-auto"
      style={{ height: "300px" }}
    >
      {" "}
      <style> {` .chart-bar { transition: width 0.3s ease; } `} </style>{" "}
      {data.map((item, i) => {
        const width = (item.frequency / maxFreq) * 100;
        return (
          <div key={i} className="flex items-center mb-1">
            {" "}
            <div className="w-16 text-sm text-gray-700 text-right mr-2">
              {" "}
              {item.error}{" "}
            </div>{" "}
            <div
              className="chart-bar bg-blue-500 text-xs text-white px-1 whitespace-nowrap overflow-hidden"
              style={{
                height: `${barHeight}px`,
                width: `${width}%`,
                minWidth: "2px",
              }}
            >
              {" "}
              {item.frequency}{" "}
            </div>{" "}
          </div>
        );
      })}{" "}
    </div>
  );
};
export default Chart;
