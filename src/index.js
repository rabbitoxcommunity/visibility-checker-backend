require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const checkRoutes = require("./routes/check");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.json({ status: "Nazar backend running" }));
app.use("/api/check", checkRoutes);

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server on port ${PORT}`)))
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });
