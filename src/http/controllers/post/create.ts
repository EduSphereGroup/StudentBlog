import { PostRepository } from "@/repositories/post.repository";
import { CreatePostUseCase } from "@/use-cases/create-post";
import { Request, Response } from "express";
import { z } from "zod";

export async function create(req: Request, res: Response) {
  const registerBodySchema = z.object({
    id: z.number(),
    title: z.string(),
    subTitle: z.string(),
    content: z.string(),
    createdOn: z.coerce.date(),
    userId: z.number(),
    file: z.any(),
  });

  const { id, title, subTitle, content, createdOn, userId, file } =
    registerBodySchema.parse(req.body);

  try {
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
  } catch (error) {
    console.error(error);

    throw new Error("Internal Server Error");
  }
}
