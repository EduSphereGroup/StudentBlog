import { DataTypes, Model } from 'sequelize';
import sequelize from '../../infrastructure/database/config';

export default class Post extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public author!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Post',
  tableName: 'Posts',
});