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
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function YearlyMoodLineChart(props: {
  moodSeries: number[];
  year: number;
}) {
  const curYear = dayjs().utcOffset(7).set("year", props.year);

  return (
    <div className="h-96">
      <Line
        itemType="line"
        options={{
          responsive: true,
          maintainAspectRatio: false,
          borderColor: "#fff",
          scales: {
            y: {
              min: 0.0,
              max: 1.0,
            },
          },
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: `Average Mood: ${curYear.format("YYYY")}`,
            },
          },
        }}
        data={{
          labels: Array(12)
            .fill(null)
            .map((_, index) => dayjs().set("month", index).format("MMMM")),
          datasets: [
            {
              label: "Average mood per month",
              data: props.moodSeries,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235)",
              fill: true,
            },
          ],
        }}
      />
    </div>
  );
}
