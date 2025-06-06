import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auths.js";
import productRouter from "./routes/products.js";
import userRouter from "./routes/users.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: process.env.CLIENT_URL,
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

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

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
