import { useEffect, useRef, useCallback } from "react";
import { Chart, registerables } from "chart.js";
import { RoofingProject } from "../types/types";

Chart.register(...registerables);

interface ChartComponentProps {
  type: "bar" | "pie" | "line";
  projects: RoofingProject[];
  metric:
    | "projectsByState"
    | "roofSizeByType"
    | "monthlyTrends"
    | "energySavingsByType";
}

const ChartComponent = ({ type, projects, metric }: ChartComponentProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  const prepareData = useCallback(() => {
    switch (metric) {
      case "projectsByState": {
        const stateCount = projects.reduce((acc, project) => {
          acc[project.state] = (acc[project.state] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        return {
          labels: Object.keys(stateCount),
          datasets: [
            {
              label: "Projects by State",
              data: Object.values(stateCount),
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        };
      }

      case "roofSizeByType": {
        const roofSizes = projects.reduce((acc, project) => {
          if (!acc[project.roofType]) {
            acc[project.roofType] = {
              total: 0,
              count: 0,
            };
          }
          acc[project.roofType].total += project.roofSize;
          acc[project.roofType].count += 1;
          return acc;
        }, {} as Record<string, { total: number; count: number }>);

        const averages = Object.entries(roofSizes).reduce(
          (acc, [type, data]) => {
            acc[type] = Math.round(data.total / data.count);
            return acc;
          },
          {} as Record<string, number>
        );

        return {
          labels: Object.keys(averages),
          datasets: [
            {
              label: "Average Roof Size (sq ft)",
              data: Object.values(averages),
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
              ],
            },
          ],
        };
      }

      case "energySavingsByType": {
        const savingsByType = projects.reduce((acc, project) => {
          if (!acc[project.roofType]) {
            acc[project.roofType] = {
              total: 0,
              count: 0,
            };
          }
          acc[project.roofType].total += project.estimatedEnergySavings;
          acc[project.roofType].count += 1;
          return acc;
        }, {} as Record<string, { total: number; count: number }>);

        const averages = Object.entries(savingsByType).reduce(
          (acc, [type, data]) => {
            acc[type] = Math.round(data.total / data.count);
            return acc;
          },
          {} as Record<string, number>
        );

        return {
          labels: Object.keys(averages),
          datasets: [
            {
              label: "Average Energy Savings (kWh)",
              data: Object.values(averages),
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };
      }

      case "monthlyTrends": {
        const monthlyData = projects.reduce((acc, project) => {
          const month = project.projectDate.toLocaleString("default", {
            month: "short",
          });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        return {
          labels: Object.keys(monthlyData),
          datasets: [
            {
              label: "Monthly Project Trends",
              data: Object.values(monthlyData),
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        };
      }
    }
  }, [metric, projects]);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const data = prepareData();

    chartInstance.current = new Chart(ctx, {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              padding: 20,
              font: {
                size: 12,
              },
            },
          },
          title: {
            display: true,
            text:
              metric === "projectsByState"
                ? "Projects by State"
                : metric === "roofSizeByType"
                ? "Average Roof Size by Type"
                : metric === "energySavingsByType"
                ? "Average Energy Savings by Roof Type"
                : "Monthly Project Trends",
            padding: {
              top: 10,
              bottom: 20,
            },
            font: {
              size: 16,
              weight: "bold",
            },
          },
        },
        scales:
          metric === "roofSizeByType" ||
          metric === "energySavingsByType" ||
          metric === "projectsByState"
            ? {
                x: {
                  ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                  },
                  grid: {
                    display: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  grid: {
                    color: "rgba(0, 0, 0, 0.1)",
                  },
                },
              }
            : undefined,
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, projects, metric, prepareData]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef} />
    </div>
  );
};

export default ChartComponent;
