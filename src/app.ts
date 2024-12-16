import express, { Request, Response } from "express";
import { postRoutes } from "@/http/controllers/post/routes";

export const app = express();

app.use("/posts", postRoutes);
