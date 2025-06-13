import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auths.js";
import productRouter from "./routes/products.js";
import userRouter from "./routes/users.js";
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

const port = process.env.PORT || 5000; // Sẽ là 8000 nhờ file .env
const corsOptions = {
  origin: process.env.CLIENT_URL, // Sẽ là http://localhost:5173 nhờ file .env
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
};

// Áp dụng các middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions)); // Đảm bảo corsOptions được áp dụng

// Thêm Content-Security-Policy Header
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: http://localhost:8000;"
  ); // Cho phép ảnh từ 'self' và localhost:8000
  next();
});

const staticPath = path.join(__dirname, 'uploads');
console.log('Express static serving from:', staticPath);
app.use("/api/uploads", express.static(staticPath));

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  console.log(error.stack);
  res.status(500).json({ message: "Something went wrong" });
});

connect().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}); 