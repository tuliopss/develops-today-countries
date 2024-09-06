// // import * as React from "react";
// import { BarChart } from "@mui/x-charts/BarChart";
// import { countriesService } from "../../services/country-service";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import styles from "./PopulationChart.module.css";
// const chartSetting = {
//   xAxis: [
//     {
//       label: "rainfall (mm)",
//     },
//   ],
//   width: 500,
//   height: 400,
// };

// const valueFormatter = (value: number | null) => `${value}mm`;

// export default function PopulationChart({ countryCode, country }: any) {
//   // const { countryCode = "" } = useParams();

//   console.log("a", country.population.populationCounts);
//   const populationData = country.population.populationCounts;
//   const chartSetting = {
//     xAxis: [
//       {
//         label: "years",
//       },
//     ],
//     width: 500,
//     height: 400,
//   };

//   return (
//     <div className={styles.chartContainer}>
//       <BarChart
//         dataset={populationData}
//         yAxis={[{ scaleType: "band", dataKey: "value" }]}
//         series={[
//           { dataKey: "year", label: "Population Counts", valueFormatter },
//         ]}
//         layout='horizontal'
//         {...chartSetting}
//       />
//     </div>
//   );
// }
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useState } from "react";

// type TickParamsSelectorProps = {
//   tickPlacement: "end" | "start" | "middle" | "extremities";
//   tickLabelPlacement: "tick" | "middle";
//   setTickPlacement: React.Dispatch<
//     React.SetStateAction<"end" | "start" | "middle" | "extremities">
//   >;
//   setTickLabelPlacement: React.Dispatch<
//     React.SetStateAction<"tick" | "middle">
//   >;
// };

// function TickParamsSelector({
//   tickPlacement,
//   tickLabelPlacement,
//   setTickPlacement,
//   setTickLabelPlacement,
// }: TickParamsSelectorProps) {
//   return (
//     <Stack
//       direction='column'
//       justifyContent='space-between'
//       sx={{ width: "100%" }}>
//       <FormControl>
//         <FormLabel id='tick-placement-radio-buttons-group-label'>
//           tickPlacement
//         </FormLabel>
//         <RadioGroup
//           row
//           aria-labelledby='tick-placement-radio-buttons-group-label'
//           name='tick-placement'
//           value={tickPlacement}
//           onChange={(event) =>
//             setTickPlacement(
//               event.target.value as "start" | "end" | "middle" | "extremities"
//             )
//           }>
//           <FormControlLabel value='start' control={<Radio />} label='start' />
//           <FormControlLabel value='end' control={<Radio />} label='end' />
//           <FormControlLabel value='middle' control={<Radio />} label='middle' />
//           <FormControlLabel
//             value='extremities'
//             control={<Radio />}
//             label='extremities'
//           />
//         </RadioGroup>
//       </FormControl>
//       <FormControl>
//         <FormLabel id='label-placement-radio-buttons-group-label'>
//           tickLabelPlacement
//         </FormLabel>
//         <RadioGroup
//           row
//           aria-labelledby='label-placement-radio-buttons-group-label'
//           name='label-placement'
//           value={tickLabelPlacement}
//           onChange={(event) =>
//             setTickLabelPlacement(event.target.value as "tick" | "middle")
//           }>
//           <FormControlLabel value='tick' control={<Radio />} label='tick' />
//           <FormControlLabel value='middle' control={<Radio />} label='middle' />
//         </RadioGroup>
//       </FormControl>
//     </Stack>
//   );
// }

// const valueFormatter = (value: number | null) => `${value}`;

export default function PopulationChart({ country }: any) {
  const populationData = country.population.populationCounts;
  const chartSetting = {
    yAxis: [
      {
        label: "Population",
        dataKey: "value",
      },
    ],
    series: [{ dataKey: "value", label: "Population Count" }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };
  return (
    <div className={styles.chartContainer}>
      <div style={{ width: "100%" }}>
        <BarChart
          dataset={populationData}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "year",
            },
          ]}
          {...chartSetting}
        />
      </div>
    </div>
  );
}
