import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Chart as ChartJS, registerables } from "chart.js";
import "./style.scss";

// Đăng ký các thành phần biểu đồ
ChartJS.register(...registerables);

function RoleUser() {
  const { listTask } = useSelector((state) => state.taskStore);
  const { userInfo } = useSelector((state) => state.authStore);
  const { projects } = useSelector((state) => state.projectStore);

  // Hàm formatDate để định dạng ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Hàm tạo mảng 7 ngày từ hiện tại
  const getNextSevenDays = () => {
    const days = [];
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date();
      nextDay.setDate(currentDate.getDate() + i);
      days.push(nextDay.toDateString()); // Định dạng ngày dạng chuỗi
    }
    return days;
  };
  const nextSevenDays = getNextSevenDays();

  // Lọc các task của người dùng trong 7 ngày tới
  const filteredTasks =
    listTask?.filter((task) => {
      const timeEnd = new Date(task.time_end);
      const currentDate = new Date();
      const sevenDaysLater = new Date();
      sevenDaysLater.setDate(currentDate.getDate() + 7);

      return (
        task.user_mail === userInfo.email &&
        task.status !== 4 &&
        currentDate <= timeEnd &&
        timeEnd <= sevenDaysLater
      );
    }) || [];

  const taskByDate = nextSevenDays.reduce((acc, date) => {
    acc[date] = filteredTasks.filter(
      (task) => new Date(task.time_end).toDateString() === date
    );
    return acc;
  }, {});

  const [selectedTasks, setSelectedTasks] = useState(
    taskByDate[nextSevenDays[0]] || []
  );

  const datasets = [
    {
      label: "Tasks",
      data: nextSevenDays.map((date) => taskByDate[date].length || 0),
      borderColor: "#42a5f5", // Màu của đường line
      backgroundColor: "rgba(66, 165, 245, 0.2)", // Màu nền dưới đường line (nếu muốn)
      pointBackgroundColor: "#ff4081", // Màu của các điểm trên đường line
      pointBorderColor: "#fff", // Màu viền của các điểm trên đường line
      pointHoverBackgroundColor: "#ff4081", // Màu nền của điểm khi hover
      pointHoverBorderColor: "#ff4081", // Màu viền của điểm khi hover
      tension: 0.4, // Độ cong của line, 0 là line thẳng, càng gần 1 càng cong
    },
  ];

  const chartData = { labels: nextSevenDays, datasets };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const selectedDate = nextSevenDays[index];
        setSelectedTasks(taskByDate[selectedDate]);
      }
    },
    // Thêm tùy chọn onHover để thay đổi con trỏ
    onHover: (event, elements) => {
      event.native.target.style.cursor = elements.length
        ? "pointer"
        : "default";
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: function (context) {
              const screenWidth = context.chart.width;
              return screenWidth > 1024 ? 16 : screenWidth > 768 ? 14 : 12;
            },
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Đặt khoảng cách giữa các giá trị trên trục y là 1
          font: {
            size: function (context) {
              const screenWidth = context.chart.width;
              return screenWidth > 768 ? 14 : 12;
            },
          },
        },
      },
      x: {
        offset: true, // Giúp các cột nằm giữa
        barThickness: function (context) {
          const screenWidth = context.chart.width;
          return screenWidth > 768 ? 50 : 30; // Kích thước cột lớn hơn cho màn hình lớn
        },
        maxBarThickness: 80, // Giới hạn chiều rộng tối đa của cột
        minBarLength: 10, // Đảm bảo cột luôn có độ dài tối thiểu
        ticks: {
          font: {
            size: function (context) {
              const screenWidth = context.chart.width;
              return screenWidth > 768 ? 14 : 12;
            },
          },
        },
      },
    },
  };

  return (
    <div className="containerTaskUser">
      <div className="card p-3">
        <h5 className="mb-3 ">Task Chart for the Next 7 Days</h5>
        <div style={{ height: "40vh" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="card px-3">
        <h5 className="mb-3">Task Information</h5>
        <div className="py-2">
          {selectedTasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            selectedTasks.map((task) => (
              <div key={task.id} className="py-4 px-3 mb-3  border rounded">
                <h6 className="pb-1">
                  <strong>{task.task_name}</strong>
                </h6>
                <p>
                  <strong>Project:</strong> {task.project_name}
                </p>
                <p>
                  <strong>Deadline:</strong> {formatDate(task.time_end)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default RoleUser;
