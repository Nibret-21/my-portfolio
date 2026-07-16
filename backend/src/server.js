
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Load .env FIRST
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../.env");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// Import modules AFTER dotenv is loaded
const { connectDB, sequelize } = await import("./config/db.js");
const { default: express } = await import("express");
const { default: cors } = await import("cors");
const { default: helmet } = await import("helmet");
const { default: rateLimit } = await import("express-rate-limit");
const { default: xss } = await import("xss-clean");

const { default: routes } = await import("./routes/index.js");
const { errorHandler, notFound } = await import("./middleware/errorHandler.js");

const app = express();

// Security middleware
app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  }),
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(xss());

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", limiter);

// Static uploads
app.use("/uploads", express.static("uploads"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
  });
});

// Routes
app.use("/api", routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();

    // Local development only
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`API listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

start();
