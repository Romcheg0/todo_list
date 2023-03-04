import { Model, DataType, Table, Column, HasMany } from "sequelize-typescript";
import { Group } from "src/group/group.model";
import { Todo } from "src/todo/todo.model";

interface UserCreationAttrs{
  username: string;
  password: string;
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({type: DataType.STRING, unique: true, allowNull: false })
  username: string;
  @Column({type: DataType.STRING, allowNull: false })
  password: string;
  @HasMany(()=>Group)
  groups: Group[]
  @HasMany(()=>Todo)
  todos: Todo[]
}