import { Model, DataType, Table, Column, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Group } from "src/group/group.model";
import { User } from "src/users/users.model";

interface TodoCreationAttrs{
  text: string
  isCompleted: boolean
  userID: number
  groupID?: number
}

@Table({tableName: "todos"})
export class Todo extends Model<Todo, TodoCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({type: DataType.STRING, allowNull: false })
  text: string;
  @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isCompleted: boolean
  @ForeignKey(()=>User)
  @Column({type: DataType.INTEGER, allowNull: false })
  userId: string;
  @ForeignKey(()=>Group)
  @Column({type: DataType.INTEGER, allowNull: true})
  groupId: string
  @BelongsTo(()=>User)
  owner: User
  @BelongsTo(()=>Group)
  group: Group
}