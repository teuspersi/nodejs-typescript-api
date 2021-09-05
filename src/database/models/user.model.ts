import { db } from "../db";
import Sequelize, { DataTypes, Model } from "sequelize";
import { Post } from "./post.model";

export class User extends Model {
  id: string;

  name: string;

  email: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: db,
    tableName: "users",
    modelName: "User",
  }
);

User.hasMany(Post, { foreignKey: "user_id", as: "posts" });
Post.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  as: "user",
});
