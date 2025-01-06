import { PostRepository } from "@/repositories/post.repository";
import { FindPostByIdUseCase } from "@/use-cases/find-post-by-id";
import { Request, Response } from "express";
import { z } from "zod";

export async function findById(req: Request, res: Response): Promise<void> {
  const idParamSchema = z.object({
    id: z.string(),
  });

  try {
    const { id } = idParamSchema.parse(req.params);

    const postRepository = new PostRepository();
    const findPostByIdUseCase = new FindPostByIdUseCase(postRepository);

    const foundPost = await findPostByIdUseCase.handler(id);

    if (!foundPost) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json(foundPost);
  } catch (error) {
    console.error("Error in findById:", error);

    if (error instanceof z.ZodError) {
      res.status(400).json({
        message:
          "Validation failed. Check the request parameters and try again.",
        errors: error.errors,
      });
      return;
    }

    res.status(500).json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
