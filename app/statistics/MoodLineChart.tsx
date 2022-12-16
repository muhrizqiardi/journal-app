"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MoodLineChart(props: { moodSeries: number[] }) {
  return (
    <Line
      itemType="line"
      options={{
        responsive: true,
        borderColor: "#fff",
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: "Average Mood",
          },
        },
      }}
      data={{
        labels: Array(31)
          .fill(null)
          .map((_, index) => (index + 1).toString()),
        datasets: [
          {
            label: "Average mood per day",
            data: props.moodSeries,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235)",
            fill: true,
          },
        ],
      }}
    />
  );
}
