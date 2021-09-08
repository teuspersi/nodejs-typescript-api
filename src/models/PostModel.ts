import { db } from "../database/db";
import Sequelize, { DataTypes, Model } from "sequelize";

export class Post extends Model {
  id: string;

  // eslint-disable-next-line camelcase
  user_id: string;

  title: string;

  content: string;

  createdAt: Date;

  updatedAt: Date;
}

Post.init(
  {
    post_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: db,
    tableName: "posts",
    modelName: "Post",
  }
);
