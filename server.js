import "dotenv/config";
import express from "express";
import db from "./config/db.js";  
import routes from "./routes/routes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Login Backend Working" });
});

app.use("/master/create", routes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// 🚀 DATABASE CONNECTION TEST
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB Connection failed:", err.message);
    process.exit(1);  // Exit if DB fails
  }
  connection.release();  // Return to pool
  console.log("✅ MySQL connected successfully!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
