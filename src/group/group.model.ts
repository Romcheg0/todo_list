import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Table, Column, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Todo } from "src/todo/todo.model";
import { User } from "src/users/users.model";

interface GroupCreationAttrs{
  name: string;
  userID: number;
}

@Table({tableName: "groups"})
export class Group extends Model<Group, GroupCreationAttrs>{
  @ApiProperty({example: 1, description: "Group ID"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @ApiProperty({example: "My todos", description: "Group name"})
  @Column({type: DataType.STRING, allowNull: false })
  name: string;
  @ApiProperty({example: "2", description: "ID of user whom this group is assigned to"})
  @ForeignKey(()=>User)
  @Column({type: DataType.INTEGER, allowNull: false })
  userId: number;
  @BelongsTo(()=>User)
  owner: User
  @HasMany(()=>Todo)
  todos: Todo[]
}