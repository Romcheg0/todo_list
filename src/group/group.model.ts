import { Model, DataType, Table, Column, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Todo } from "src/todo/todo.model";
import { User } from "src/users/users.model";

interface GroupCreationAttrs{
  name: string;
  userID: number;
}

@Table({tableName: "groups"})
export class Group extends Model<Group, GroupCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({type: DataType.STRING, allowNull: false })
  name: string;
  @ForeignKey(()=>User)
  @Column({type: DataType.INTEGER, allowNull: false })
  userId: number;
  @BelongsTo(()=>User)
  owner: User
  @HasMany(()=>Todo)
  todos: Todo[]
}