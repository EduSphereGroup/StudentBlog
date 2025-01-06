import { PostRepository } from "@/repositories/post.repository";
import { GetPostsUseCase } from "@/use-cases/get-posts";
import { Request, Response } from "express";

export async function get(req: Request, res: Response) {
  try {
    const postRepository = new PostRepository();
    const getPostsUseCase = new GetPostsUseCase(postRepository);

    const posts = await getPostsUseCase.handler();

    res.status(200).send(posts);
  } catch (error) {
    console.error(error);

    res.send(500).json({
      message: "Internal Server Error",
    });
  }
}
