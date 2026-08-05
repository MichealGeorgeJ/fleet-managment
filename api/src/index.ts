import express from "express";
import { router } from "./routes/index";
import { errorHandler } from "./shared/middlewares/error.middleware";
import { config } from "dotenv";
import { ENV } from "./shared/constants/env.constant";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(errorHandler);

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
    console.log(`Documentation is available at http://localhost:${ENV.PORT}/docs`)
});