import { User } from "../models/UserModel";
import { hash } from "bcryptjs";
import { AppError } from "../errors/AppError";
import { Post } from "../models/PostModel";

class UserService {
  async findAll() {
    return User.findAll({
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
      include: [{ model: Post, as: "posts" }],
    });
  }

  async findOne(id) {
    return User.findByPk(id, {
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
      // include: [{ model: Post, as: "posts" }],
    });
  }

  async create(name, email, password) {
    const userAlreadyExists = await User.findOne({ where: { email: email } });

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 3);

    return User.create({
      name,
      email,
      password: passwordHash,
    });
  }

  async update(id, name, email, password) {
    return User.update(
      {
        name,
        email,
        password,
      },
      {
        where: { id: id },
      }
    );
  }

  async destroy(id) {
    return User.destroy({ where: { id: id } });
  }
}

export default new UserService();
