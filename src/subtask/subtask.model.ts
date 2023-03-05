import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Table, Column, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Todo } from "src/todo/todo.model";

interface SubtaskCreationAttrs{
  text: string
  isCompleted: boolean
  todoId: number
}

@Table({tableName: "subtasks"})
export class Subtask extends Model<Subtask, SubtaskCreationAttrs>{
  @ApiProperty({example: "1", description: "Subtask ID"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example: "Perform a swiper", description: "Text of subtask"})
  @Column({type: DataType.STRING, allowNull: false })
  text: string;

  @ApiProperty({example: "true", description: "Is subtask completed or not"})
  @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isCompleted: boolean

  @ApiProperty({example: "2", description: "ID of todo which the subtask is assigned to"})
  @ForeignKey(()=>Todo)
  @Column({type: DataType.INTEGER, allowNull: false })
  todoId: number;

  @BelongsTo(()=>Todo)
  task: Todo
}