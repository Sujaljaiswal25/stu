import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/configs/db.config.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
