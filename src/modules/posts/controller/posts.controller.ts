import { NextFunction, Request, Response } from "express";
import { postService } from "../service/posts.service";

class PostController {
  async get(req: Request, res: Response) {
    try {
      const result = await postService.get();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar posts" });
    }
  }

  async getbyId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await postService.getById(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { idusuario } = req.body;
      if (!idusuario) {
        return res.status(400).json({ message: 'idusuario é obrigatório' });
      }
      const result = await postService.create(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await postService.update(id, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const postController = new PostController();
