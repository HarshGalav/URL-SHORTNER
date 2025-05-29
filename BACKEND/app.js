import express from "express";
import dotenv from "dotenv";

import connectDB from "./src/config/mongo.config.js";
import urlRoutes from "./src/routes/url.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Prefix all URL routes with /api
app.use("/api", urlRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
