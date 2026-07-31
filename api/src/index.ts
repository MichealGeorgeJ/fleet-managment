import express from "express";
import { router } from "./routes/index";
import { errorHandler } from "./shared/middlewares/error.middleware";
import { config } from "dotenv";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


