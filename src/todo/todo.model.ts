import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Table, Column, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Group } from "src/group/group.model";
import { Subtask } from "src/subtask/subtask.model";
import { User } from "src/users/users.model";

interface TodoCreationAttrs{
  text: string
  isCompleted: boolean
  userID: number
  groupID?: number
}

@Table({tableName: "todos"})
export class Todo extends Model<Todo, TodoCreationAttrs>{
  @ApiProperty({example: "1", description: "Task ID"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example: "Fix a bug", description: "Task text"})
  @Column({type: DataType.STRING, allowNull: false })
  text: string;

  @ApiProperty({example: "true", description: "Is the task completed or not"})
  @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isCompleted: boolean

  @ApiProperty({example: "1", description: "ID of the user whom the task is assigned to"})
  @ForeignKey(()=>User)
  @Column({type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ApiProperty({example: "2", description: "ID of the group which the task is assigned to"})
  @ForeignKey(()=>Group)
  @Column({type: DataType.INTEGER, allowNull: false})
  groupId: number

  @BelongsTo(()=>User)
  owner: User

  @BelongsTo(()=>Group)
  group: Group

  @HasMany(()=>Subtask)
  subtasks: Subtask[]
}