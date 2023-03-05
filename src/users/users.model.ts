import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Table, Column, HasMany } from "sequelize-typescript";
import { Group } from "src/group/group.model";
import { Todo } from "src/todo/todo.model";

interface UserCreationAttrs{
  username: string;
  password: string;
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs>{
  @ApiProperty({example: "1", description: "User ID"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @ApiProperty({example: "John", description: "User name"})
  @Column({type: DataType.STRING, unique: true, allowNull: false,  })
  username: string;
  @ApiProperty({example: "John1234", description: "User password"})
  @Column({type: DataType.STRING, allowNull: false })
  password: string;
  @HasMany(()=>Group)
  groups: Group[]
  @HasMany(()=>Todo)
  todos: Todo[]
}