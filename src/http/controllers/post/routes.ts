import { Router } from "express";
import { create } from "./create";
import { get } from "./get";
import { findById } from "./findById";

const postRoutes = Router();

postRoutes.get("/", get);
postRoutes.get("/:id", findById);
postRoutes.post("/", create);

export { postRoutes };
