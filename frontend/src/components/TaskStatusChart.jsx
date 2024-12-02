// src/PieChart.js
import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';

Chart.register(...registerables);

const TaskStatusChart = () => {
  const { listTask } = useSelector((state) => state.taskStore)

  const filteredTasks = useMemo(() => {
    return {
        pending: listTask.filter((task) => task.status === 1).length,
        inProgress: listTask.filter((task) => task.status === 2).length,
        qatest: listTask.filter((task) => task.status === 3).length,
        completed: listTask.filter((task) => task.status === 4).length,
    }
  },[listTask])

  const data = {
    labels: ['Pending', 'In Progress', 'QA Test',  'Completed'],
    datasets: [
      {
        label: '# of Votes',
        data: [filteredTasks.pending, filteredTasks.inProgress, filteredTasks.qatest, filteredTasks.completed],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.7)',
          '#99EDC3',
          'rgba(255, 206, 86, 0.6)'
        ]
      },
    ],
  };

  const options = {
    responsive: true, // Enable responsive resizing
    maintainAspectRatio: false, // Allow the chart to fill the container
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default TaskStatusChart;
