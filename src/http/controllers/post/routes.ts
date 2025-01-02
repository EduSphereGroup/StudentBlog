import { Router } from "express";
import { create } from "./create";
import { get } from "./get";

const postRoutes = Router();

postRoutes.get("/", get);

postRoutes.post("/", create);

postRoutes.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Detalhes do post ${id}`);
});

export { postRoutes };
