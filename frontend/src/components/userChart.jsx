import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useSelector } from "react-redux";

// Đăng ký các thành phần cần thiết của Chart.js
Chart.register(...registerables);

function UserChart(props) {
  const { listTask } = useSelector((state) => state.taskStore);
  const { listUser } = useSelector((state) => state.userStore);

  // Tìm những user chưa có task
  const usersWithoutTask = listUser.filter(
    (user) => !listTask.some((task) => task.user_mail === user.email)
  );

  // Lọc những user có task cần hoàn thành trong 7 ngày tới
  const usersWithUpcomingTasks = listUser.filter((user) =>
    listTask.some((task) => {
      const timeEnd = new Date(task.time_end);
      const currentDate = new Date();
      const sevenDaysLater = new Date();
      sevenDaysLater.setDate(currentDate.getDate() + 7);

      return (
        task.user_mail === user.email &&
        task.status !== 4 && // Giả sử 4 là trạng thái hoàn thành
        timeEnd >= currentDate &&
        timeEnd <= sevenDaysLater
      );
    })
  );

  const data = {
    labels: ["Users Without Task", "Users With Upcoming Tasks"], // Nhãn cho cột biểu đồ
    datasets: [
      {
        label: "Number of Users", // Chú thích duy nhất cho cả hai loại dữ liệu
        data: [usersWithoutTask.length, usersWithUpcomingTasks.length], // Số liệu của từng cột
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 159, 64, 0.6)"], // Màu sắc cho từng cột
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"], // Màu viền cho từng cột
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, // Hiển thị legend
        labels: {
          boxWidth: 0, // Đặt chiều rộng khối chữ nhật thành 0 để không có màu
          font: {
            size: 14, // Kích thước chữ
          },
        },
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default UserChart;
