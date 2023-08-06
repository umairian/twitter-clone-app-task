import express from "express";
import { Application, Request, Response } from "express";
import expressLogger from "express-bunyan-logger";
import cors from "cors";
import router from "./routes";
import { connect } from "./models";

const app: Application = express();

connect();

// Parsing Request Bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Using Express logger
app.use(
    expressLogger({
        excludes: [
            "headers",
            "req",
            "user-agent",
            "short-body",
            "http-version",
            "req-headers",
            "res-headers",
            "body",
            "res",
        ], // remove extra details from log
    })
);

// Enabling CORS
app.use(cors());

// Test route
app.get("/api/test", (req: Request, res: Response) => {
    res.status(200).send(`Twitter clone app release 0.0.1`);
});

// Redirecting requests to Routes
app.use("/api", router);

// Handling invalid, 404 requests
app.use((req: Request, res: Response) => {
    return res.status(404).send("Invalid route, Route not found");
});

export default app;