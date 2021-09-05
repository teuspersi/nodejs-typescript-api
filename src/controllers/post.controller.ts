/* eslint-disable camelcase */
import { Request, Response } from "express";
import PostService from "../services/post.services";

class PostController {
  async create(request: Request, response: Response) {
    const id = response.locals.user.id;
    const { title, content } = request.body;

    const post = await PostService.create(id, title, content);

    return response.status(201).json(post);
  }

  async findByUser(request: Request, response: Response) {
    const id = response.locals.user.id;

    const posts = await PostService.findByUser(id);

    return posts.length > 0
      ? response.status(200).json(posts)
      : response.status(204).send();
  }

  async findAll(request: Request, response: Response) {
    const posts = await PostService.findAll();

    return posts.length > 0
      ? response.status(200).json(posts)
      : response.status(204).send();
  }

  async findOne(request: Request, response: Response) {
    const { post_id } = request.params;
    const post = await PostService.findOne(post_id);

    return post ? response.status(200).json(post) : response.status(204).send();
  }

  async update(request: Request, response: Response) {
    const { post_id } = request.params;
    const { title, content } = request.body;

    await PostService.update(post_id, title, content);
    return response.status(204).send();
  }

  async destroy(request: Request, response: Response) {
    const { post_id } = request.params;

    await PostService.destroy(post_id);

    return response.status(204).send();
  }
}

export default new PostController();
