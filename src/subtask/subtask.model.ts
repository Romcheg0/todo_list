import { Model, DataType, Table, Column, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Todo } from "src/todo/todo.model";

interface SubtaskCreationAttrs{
  text: string
  isCompleted: boolean
  todoId: number
}

@Table({tableName: "subtasks"})
export class Subtask extends Model<Subtask, SubtaskCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({type: DataType.STRING, allowNull: false })
  text: string;
  @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isCompleted: boolean
  @ForeignKey(()=>Todo)
  @Column({type: DataType.INTEGER, allowNull: false })
  todoId: number;
  @BelongsTo(()=>Todo)
  task: Todo
}