// BarChart.js
import { Chart, registerables } from 'chart.js';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

Chart.register(...registerables);

const monthsCharacter = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const TaskChart = () => {
  const { listTask } = useSelector((state) => state.taskStore);

  const filteredTasks = useMemo(() => {
    let labels = [];
    const currentDate = new Date(Date.now()).getDate();

    const monthOfTimeStart = listTask.map((task) => new Date(task.time_start).getMonth());
    const monthOfTimeEnd = listTask.map((task) => new Date(task.time_end).getMonth());

    const minMonth = Math.min(...monthOfTimeStart);
    const maxMonth = Math.max(...monthOfTimeEnd);

    let tasks = {
      overdue: [],
      pending: [],
      inprogress: [],
      completedNextThreeDay: [],
    };

    for (let i = minMonth; i <= maxMonth; i++) {
      labels.push(monthsCharacter[i]);

      const totalTasksOfMonth = listTask.filter((task) => new Date(task.time_end).getMonth() === i);

      tasks.overdue.push(
        totalTasksOfMonth.filter((task) => currentDate > new Date(task.time_end).getDate()).length
      );

      tasks.pending.push(totalTasksOfMonth.filter((task) => task.status === 1).length);

      tasks.inprogress.push(totalTasksOfMonth.filter((task) => task.status === 2).length);

      tasks.completedNextThreeDay.push(
        totalTasksOfMonth.filter(
          (task) =>
            task.status !== 4 &&
            (new Date(task.time_end).getTime() - new Date().getTime()) / 24 / 60 / 60 / 1000 > 0 &&
            (new Date(task.time_end).getTime() - new Date().getTime()) / 24 / 60 / 60 / 1000 < 3
        ).length
      );
    }

    return {
      ...tasks,
      labels,
    };
  }, [listTask]);

  const data = {
    labels: filteredTasks.labels,
    datasets: [
      {
        type: 'line',
        label: 'Overdue',
        data: filteredTasks.overdue,
        borderColor: '#E39FF6',
        fill: false,
      },
      {
        type: 'bar',
        label: 'Pending',
        data: filteredTasks.pending,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        type: 'bar',
        label: 'In Progress',
        data: filteredTasks.inprogress,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        type: 'line',
        label: 'Completed in next three days',
        data: filteredTasks.completedNextThreeDay,
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true, // Enable responsive resizing
    maintainAspectRatio: false, // Allow the chart to fill the container
    scales: {
      x: {
        type: 'category', // Change from 'time' to 'category'
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Values',
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default TaskChart;
