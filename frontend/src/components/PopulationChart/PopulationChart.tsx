import styles from "./PopulationChart.module.css";

import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export default function PopulationChart({ country }: any) {
  const populationData = country.population;

  const chartSetting = {
    yAxis: [
      {
        label: "Population",
      },
    ],
    series: [{ dataKey: "value", label: "Population Count" }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-50px)",
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      {populationData ? (
        <div style={{ width: "100%" }}>
          <BarChart
            slotProps={{
              loadingOverlay: { message: "Data should be available soon." },
            }}
            margin={{
              left: 100,
            }}
            dataset={populationData}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "year",
                label: "Years",
              },
            ]}
            {...chartSetting}
          />
        </div>
      ) : (
        <h1 style={{ color: "#000" }}>No Country.</h1>
      )}
    </div>
  );
}
