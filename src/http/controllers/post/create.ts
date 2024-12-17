import { PostRepository } from "@/repositories/post.repository";
import { CreatePostUseCase } from "@/use-cases/create-post";
import { Request, Response } from "express";
import { z } from "zod";

export async function create(req: Request, res: Response): Promise<void> {
  const registerBodySchema = z.object({
    id: z.coerce.number(),
    title: z.string(),
    subTitle: z.string(),
    content: z.string(),
    createdOn: z.coerce.date(),
    userId: z.coerce.number(),
    file: z.any(),
  });

  try {
    const { id, title, subTitle, content, createdOn, userId, file } =
      registerBodySchema.parse(req.body);

    const postRepository = new PostRepository();
    const createPostUseCase = new CreatePostUseCase(postRepository);

    await createPostUseCase.handler({
      id,
      title,
      subTitle,
      content,
      createdOn,
      userId,
      file,
    });

    res.status(201).send();
  } catch (error) {
    console.error(error);

    // Erros de validação do Zod
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message:
          "Validation failed, check the format of the request and try again",
        errors: error.errors,
      });
    }

    // Outros erros inesperados
    res.status(500).json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
