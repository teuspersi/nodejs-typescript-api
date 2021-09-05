/* eslint-disable camelcase */
import { Post } from "../database/models/post.model";
import { User } from "../database/models/user.model";

class PostServices {
  async create(user_id, title, content) {
    return Post.create({
      user_id,
      title,
      content,
    });
  }

  async findByUser(user_id) {
    return Post.findAll({ where: { user_id: user_id } });
  }

  async findAll() {
    return Post.findAll({
      attributes: ["post_id", "title", "content", "createdAt", "updatedAt"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "createdAt", "updatedAt"],
        },
      ],
    });
  }

  async findOne(post_id) {
    return Post.findByPk(post_id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "createdAt", "updatedAt"],
        },
      ],
    });
  }

  async update(post_id, title, content) {
    return Post.update(
      {
        title,
        content,
      },
      {
        where: { post_id: post_id },
      }
    );
  }

  async destroy(post_id) {
    return Post.destroy({ where: { post_id: post_id } });
  }
}

export default new PostServices();
