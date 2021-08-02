import express, { Application } from "express";
import router from "./routes";
import hpp from "hpp";
import helmet from "helmet";
import compression from "compression";

const app: Application = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Security
app.use(helmet());
app.use(hpp());

// Performance
app.use(compression());

// -- Logging

// Routes
app.use("/api/v1", router);

app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
});

export default app;