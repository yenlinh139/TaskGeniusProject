// BarChart.js
import { Chart, registerables } from "chart.js";
import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

Chart.register(...registerables);

const monthsCharacter = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ProjectsChart = () => {
  const { projects } = useSelector((state) => state.projectStore);

  const filterProjects = useMemo(() => {
    let labels = [];
    const currentDate = new Date(Date.now()).getDate();

    const monthOfTimeStart = projects.map((project) =>
      new Date(project.time_start).getMonth()
    );
    const monthOfTimeEnd = projects.map((project) =>
      new Date(project.time_end).getMonth()
    );

    const minMonth = Math.min(...monthOfTimeStart);
    const maxMonth = Math.max(...monthOfTimeEnd);

    let project = {
      inprogress: [],
      completedNextSevenDay: [],
      priority: [],
    };

    for (let i = minMonth; i <= maxMonth; i++) {
      labels.push(monthsCharacter[i]);

      const totalTasksOfMonth = projects.filter(
        (project) => new Date(project.time_end).getMonth() == i
      );

      project.inprogress.push(
        totalTasksOfMonth.filter(
          (project) => currentDate >= new Date(project.time_start).getDate()
        ).length
      );

      project.completedNextSevenDay.push(
        totalTasksOfMonth.filter((project) => {
          const differenceInMillis = new Date(project.time_end) - new Date();
          const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
          return differenceInDays <= 7;
        }).length
      );

      project.priority.push(
        totalTasksOfMonth.filter((project) => project.priority === 1).length
      );
    }
    return {
      ...project,
      labels,
    };
  }, [projects]);

  const data = {
    labels: filterProjects.labels,
    datasets: [
      {
        label: "In Progress",
        data: filterProjects.inprogress,
        fill: true,
        borderColor: "rgba(75, 192, 192, 0.8)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
        pointRadius: 3,
        pointBackgroundColor: "rgba(75, 192, 192, 0.8)",
      },
      {
        label: "Completed in next seven days",
        data: filterProjects.completedNextSevenDay,
        fill: true,
        borderColor: "rgba(255, 159, 64, 0.8)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        tension: 0.1,
        pointRadius: 3,
        pointBackgroundColor: "rgba(255, 159, 64, 0.8)",
      },
      {
        label: "Priority",
        data: filterProjects.priority,
        fill: true,
        borderColor: "rgba(255, 99, 132, 0.8)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.1,
        pointRadius: 3,
        pointBackgroundColor: "rgba(255, 99, 132, 0.8)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };
  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Line data={data} options={options} />;
    </div>
  );
};

export default ProjectsChart;
