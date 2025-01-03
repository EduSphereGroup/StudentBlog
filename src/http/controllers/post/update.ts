import { Post } from "@/entities/post.entity";
import { PostRepository } from "@/repositories/post.repository";
import { UpdatePostUseCase } from "@/use-cases/update-post";
import { Request, Response } from "express";
import { z } from "zod";

export async function updatePost(req: Request, res: Response): Promise<void> {
  const registerUpdateSchema = z.object({
    id: z.string(),
    post: z.instanceof(Post).optional(),
  });

  try {
    const { id, post } = registerUpdateSchema.parse(req.body);

    const postRepository = new PostRepository();
    const updatePostUseCase = new UpdatePostUseCase(postRepository);

    const updatedPost = updatePostUseCase;

    res.send(200).json(updatePost);
  } catch (error) {
    console.error("Error in updating post:", error);

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
