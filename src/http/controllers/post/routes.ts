import { Router } from "express";
import { create } from "./create";

export const postRoutes = Router();

postRoutes.get("/", (req, res) => {
  res.send("Lista de posts");
});

// FIXME: Corrigir, esta retornando erro no zod como undefined, no terminal
postRoutes.post("/", create);

postRoutes.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Detalhes do post ${id}`);
});
