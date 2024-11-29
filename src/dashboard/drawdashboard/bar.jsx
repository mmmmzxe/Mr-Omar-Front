import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Box, useTheme } from "@mui/material";

const data = [
  {
    year: 2019,
    First: 900,
    Second: 1400,
    Third: 1700,
  },

  {
    year: 2020,
    First: 1000,
    Second: 1500,
    Third: 1800,
  },

  {
    year: 2021,
    First: 1100,
    Second: 1600,
    Third: 1900,
  },

  {
    year: 2022,
    First: 1200,
    Second: 1700,
    Third: 2000,
  },

  {
    year: 2023,
    First: 1260,
    Second: 1709,
    Third: 2080,
  },
];

const Bar = ({isDashbord = false }) => {
  const theme = useTheme();
  return (
    <Box sx={{ height:isDashbord? "300px": "75vh" }}>
      <ResponsiveBar
        data={data}
        keys={["First", "Second", "Third"]}
        indexBy="year"
        theme={{
          textColor:  'gray',
          fontSize: 11,
          axis: {
            domain: {
              line: {
                stroke:  'gray',
                strokeWidth: 1,
              },
            },
            legend: {
              text: {
                fontSize: 12,
                fill:  'gray',
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.divider,
                strokeWidth: 1,
              },
              text: {
                fontSize: 11,
                fill:  'gray',
              },
            },
          },
          grid: {
            line: {
              stroke:  'gray',
              strokeWidth: 1,
            },
          },
          legends: {
            title: {
              text: {
                fontSize: 11,
                fill:  'gray',
              },
            },
            text: {
              fontSize: 11,
              fill:  'gray',
            },
            ticks: {
              line: {},
              text: {
                fontSize: 10,
                fill:  'gray',
              },
            },
          },
          annotations: {
            text: {
              fontSize: 13,
              fill:  'gray',
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            link: {
              stroke:  'gray',
              strokeWidth: 1,
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            outline: {
              stroke:  'gray',
              strokeWidth: 2,
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            symbol: {
              fill:  'gray',
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
          },
          tooltip: {
            container: {
              background: theme.palette.background.default,
              color:  'gray',
              fontSize: 12,
            },
            basic: {},
            chip: {},
            table: {},
            tableCell: {},
            tableCellValue: {},
          },
        }}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "paired" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashbord? null : "Year",
          legendPosition: "middle",
          legendOffset: 35,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend:  isDashbord? null : "salary/month",
          legendPosition: "middle",
          legendOffset: -55,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return (
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          );
        }}
      />
    </Box>
  );
};

export default Bar;
