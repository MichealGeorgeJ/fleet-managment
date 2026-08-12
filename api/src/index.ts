import express from "express";
import { router } from "./routes/index";
import { errorHandler } from "./shared/middlewares/error.middleware";
import { config } from "dotenv";
import { ENV } from "./core/config/env.constant";
import { parseDevice } from "./shared/middlewares/device.middleware";
import { loggerMiddleware } from "./shared/middlewares/logger.middleware";

config();

const app = express();
app.use(loggerMiddleware); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(parseDevice);
app.use(router);
app.use(errorHandler);

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
    console.log(`Documentation is available at http://localhost:${ENV.PORT}/docs`)
});