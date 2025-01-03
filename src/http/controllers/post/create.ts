import { makeCreatePostUseCase } from "@/use-cases/factory/make-create-post-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function create(req: Request, res: Response): Promise<void> {
  const registerBodySchema = z.object({
    title: z.string(),
    subTitle: z.string(),
    content: z.string(),
    userId: z.coerce.number(),
    file: z.any(),
  });

  try {
    const { title, subTitle, content, userId, file } = registerBodySchema.parse(
      req.body,
    );

    const createPostUseCase = makeCreatePostUseCase();

    const post = await createPostUseCase.handler({
      title,
      subTitle,
      content,
      userId,
      file,
    });

    res.status(201).send(post);
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
