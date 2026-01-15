import express, { Router } from "express";
import dotenv from "dotenv";
import { routeProduct } from "./Route/product.route.js";
import { connectDB } from "./Config/db.js";
import cors from "cors";

app.use(cors());

dotenv.config();

const app = express();

app.get("/", (_, res) => {
  res.send("Hello from the backend server!");
});

app.use(express.json());
app.use("/api/products", routeProduct);

connectDB().then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
  });
});
