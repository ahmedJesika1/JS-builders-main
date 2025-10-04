// import { useEffect } from "react";
// import * as echarts from "echarts";
// import PropTypes from "prop-types";

// const Chart = ({ chartData = { data: [] } }) => {
//   // console.log(chartData.data, "from values data");
//   useEffect(() => {
//     if (!chartData || !chartData.data.length) return;
//     // Get the DOM element
//     const chartDom = document.getElementById("main");
//     if (!chartDom) return;

//     const myChart = echarts.init(chartDom);

//     const pieChartData = chartData.data.flatMap((item) =>
//       item.info.map((infoItem) => ({
//         name: infoItem.title,
//         value: infoItem.count,
//       }))
//     );

//     // Define the chart options
//     const option = {
//       // title: {
//       //   text: "Our Values",
//       //   left: "center",
//       //   top: 20,
//       //   textStyle: {
//       //     //   color: "#ccc",
//       //   },
//       // },
//       tooltip: {
//         trigger: "item",
//       },
//       visualMap: {
//         show: false,
//         min: 80,
//         max: 600,
//         inRange: {
//           // colorLightness: [0, 1],
//         },
//       },
//       legend: {
//         top: "bottom",
//       },
//       series: [
//         {
//           name: chartData?.data[0]?.title,
//           type: "pie",
//           center: ["50%", "50%"],
//           data: pieChartData.sort((a, b) => a.value - b.value),
//           radius: [25, 220],
//           roseType: "area",
//           itemStyle: {
//             borderRadius: 8,
//           },
//           label: {
//             // color: "rgba(255, 255, 255, 0.3)",
//           },
//           labelLine: {
//             lineStyle: {
//               //   color: "rgba(255, 255, 255, 0.3)",
//             },
//             smooth: 0.2,
//             length: 10,
//             length2: 20,
//           },
//           animationType: "scale",
//           animationEasing: "elasticOut",
//           animationDelay: () => Math.random() * 200,
//         },
//       ],
//     };

//     // Set the chart options
//     myChart.setOption(option);

//     // Cleanup on component unmount
//     return () => {
//       myChart.dispose();
//     };
//   }, [chartData]);

//   return (
//     <div
//       id="main"
//       className="xl:w-full lg:w-full h-[640px] flex justify-center items-center bg-[red]"
//     ></div>
//   );
// };

// export default Chart;

// Chart.propTypes = {
//   chartData: PropTypes.shape({
//     statusCode: PropTypes.number.isRequired,
//     status: PropTypes.string.isRequired,
//     message: PropTypes.string.isRequired,
//     data: PropTypes.arrayOf(
//       PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         title: PropTypes.string.isRequired,
//         details: PropTypes.string.isRequired,
//         info: PropTypes.arrayOf(
//           PropTypes.shape({
//             title: PropTypes.string.isRequired,
//             count: PropTypes.number.isRequired,
//             _id: PropTypes.string.isRequired,
//           })
//         ).isRequired,
//         createdAt: PropTypes.string.isRequired,
//         updatedAt: PropTypes.string.isRequired,
//         __v: PropTypes.number.isRequired,
//       })
//     ).isRequired,
//   }).isRequired,
// };

import { useEffect } from "react";
import * as echarts from "echarts";
import PropTypes from "prop-types";

const Chart = ({ chartData = { data: [] } }) => {
  useEffect(() => {
    if (!chartData || !chartData.data.length) return;

    const chartDom = document.getElementById("main");
    if (!chartDom) return;

    // Initialize the chart
    const myChart = echarts.init(chartDom);

    const pieChartData = chartData.data.flatMap((item) =>
      item.info.map((infoItem) => ({
        name: infoItem.title,
        value: infoItem.count,
      }))
    );

    const { width } = chartDom.getBoundingClientRect();
    const dynamicRadius = Math.min(width / 4, 220);

    // Define the chart options
    const option = {
      tooltip: {
        trigger: "item",
        formatter: (params) => {
          return `
           <b>${params.name}</b><br/>
           Value: ${params.data.rawValue} <br/>
          
         `;
        },
      },

      // tooltip: {
      //   trigger: "item",
      //   formatter: (params) => {
      //     // Example: Add a percentage dynamically based on the total
      //     const total = params.seriesData.reduce((sum, item) => sum + item.value, 0);
      //     const percentage = ((params.value / total) * 100).toFixed(2);

      //     return `
      //       <b>${params.name}</b><br/>
      //       Value: ${params.value} <br/>
      //       Percentage: ${percentage}%
      //     `;
      //   },
      // },
      legend: {
        top: "bottom",
      },
      series: [
        {
          // name: chartData?.data[0]?.title || "Chart",
          type: "pie",
          center: ["50%", "50%"],
          // data: pieChartData
          //   .sort((a, b) => a.value - b.value)
          //   .map((item) => ({
          //     ...item,
          //     value: Math.log(item.value) * 100, // **লগ স্কেলিং** প্রয়োগ করা হয়েছে
          //   })),
          data: pieChartData
            .sort((a, b) => a.value - b.value)
            .map((item) => ({
              name: item.name,
              value: Math.log(item.value) * 100, // Log scaling applied for visualization
              rawValue: item.value, // Store raw value for tooltip
            })),

          radius: ["15%", "70%"],
          roseType: "radius",
          itemStyle: {
            borderRadius: 8,
          },
          labelLine: {
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: () => Math.random() * 200,
        },
      ],
    };

    // Set the chart options
    myChart.setOption(option);

    // Resize chart on window resize
    const handleResize = () => {
      myChart.resize();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      myChart.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [chartData]);

  return (
    <div
      id="main"
      className="w-full px-2 h-[600px] sm:h-[600px] md:h-[600px] lg:h-[640px] xl:mt-0 md:mt-0 mt-[-120px] z-[99]"
    ></div>
  );
};

export default Chart;

Chart.propTypes = {
  chartData: PropTypes.shape({
    statusCode: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        details: PropTypes.string.isRequired,
        info: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
            _id: PropTypes.string.isRequired,
          })
        ).isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
