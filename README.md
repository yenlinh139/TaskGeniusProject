﻿# MockPorject

Mock Project là một ứng dụng web quản lý task, project và user trong dự án. Ứng dụng hỗ trợ phân quyền giữa Admin và User, cung cấp các chức năng như quản lý user, theo dõi trạng thái task, và báo cáo qua biểu đồ.

Table of Contents
Features
Tech Stack
Getting Started
Project Structure
Environment Variables
Available Scripts
Contributing
License
Features
Phân quyền Admin/User.
Quản lý user, task và project.
Theo dõi trạng thái task bằng biểu đồ.
Thông báo tùy chỉnh với react-hot-toast.
Sử dụng redux-persist để lưu trữ state.
Giao diện responsive, tích hợp Bootstrap và SCSS.
Tech Stack
Frontend: ReactJS (v18.3.1)
State Management: Redux, Redux Toolkit, Redux Persist
Styling: Bootstrap, SCSS
API Communication: Axios
Charts: Chart.js, react-chartjs-2
Authentication: Firebase, JWT
Build Tool: Vite
Getting Started
Prerequisites
Trước khi bắt đầu, bạn cần cài đặt:

Node.js (>= 14.x)
npm hoặc yarn
Installation
Clone repository:

bash
Sao chép
Chỉnh sửa
git clone https://github.com/username/mock-project.git
cd mock-project
Cài đặt dependencies:

bash
Sao chép
Chỉnh sửa
npm install
# hoặc
yarn install
Tạo file .env dựa trên cấu hình mẫu dưới đây và điền thông tin phù hợp:

env
Sao chép
Chỉnh sửa
VITE_BASE_URL=http://localhost:4001
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
Chạy dự án:

bash
Sao chép
Chỉnh sửa
npm run dev
# hoặc
yarn dev
Ứng dụng sẽ chạy tại: http://localhost:5173

Project Structure
plaintext
Sao chép
Chỉnh sửa
mock-project/
├── public/
│   ├── vite.svg                 # Logo favicon
│   └── index.html               # Template HTML chính
├── src/
│   ├── assets/                  # Ảnh và tài nguyên
│   ├── common/                  # Các file chung: constants, validation
│   ├── components/              # Các component tái sử dụng
│   ├── config/                  # Cấu hình axios và API
│   ├── hooks/                   # Custom hooks (usePagination)
│   ├── pages/                   # Các trang chính của ứng dụng
│   ├── store/                   # Redux store, reducers, actions
│   ├── App.jsx                  # App component chính
│   ├── main.jsx                 # Điểm vào ứng dụng
│   └── index.scss               # File SCSS chính
├── .env                         # Biến môi trường
├── package.json                 # Danh sách dependencies và scripts
└── README.md                    # Tài liệu dự án
Environment Variables
Dự án sử dụng file .env để cấu hình biến môi trường:



Available Scripts
Trong thư mục dự án, bạn có thể chạy các lệnh sau:

Chạy development server:
bash
Sao chép
Chỉnh sửa
npm run dev
Build dự án:
bash
Sao chép
Chỉnh sửa
npm run build
Preview production build:
bash
Sao chép
Chỉnh sửa
npm run preview
Kiểm tra code với ESLint:
bash
Sao chép
Chỉnh sửa
npm run lint
Contributing
Đóng góp luôn được chào đón! Hãy làm theo các bước sau:

Fork dự án.
Tạo branch mới (feature/your-feature-name).
Commit thay đổi.
Tạo Pull Request.
License
Dự án được cấp phép theo MIT License. Xem file LICENSE để biết thêm chi tiết.
