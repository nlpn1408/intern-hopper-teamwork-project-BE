./
├── node_modules/
├── src/
│   ├── config/                # Cấu hình ứng dụng
│   │   └── database.ts        # Cấu hình database
│   ├── controllers/           # Xử lý logic của ứng dụng
│   │   └── user.controller.ts # Xử lý các request liên quan đến người dùng
│   ├── middlewares/           # Xử lý các middleware
│   │   └── auth.middleware.ts # Xác thực người dùng
│   ├── models/                # Định nghĩa các model dữ liệu
│   │   └── user.model.ts    # Định nghĩa schema của người dùng
│   ├── routes/                 # Định nghĩa các route của ứng dụng
│   │   └── user.routes.ts     # Định nghĩa các route liên quan đến người dùng
│   ├── services/              # Xử lý logic nghiệp vụ
│   │   └── user.service.ts    # Xử lý logic nghiệp vụ liên quan đến người dùng
│   ├── utils/                 # Các hàm tiện ích
│   │   └── logger.ts          # Cấu hình logger
│   └── server.ts              # Khởi tạo và cấu hình server Express
├── .env                       # Các biến môi trường
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md