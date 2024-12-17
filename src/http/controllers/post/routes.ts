import { Router } from "express";
import { create } from "./create";

const postRoutes = Router();

postRoutes.get("/", (req, res) => {
  res.send("Lista de posts");
});

postRoutes.post("/", create);

postRoutes.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Detalhes do post ${id}`);
});

export { postRoutes };
