import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length, IsBoolean, IsInt } from "class-validator"

export class CreateTodoDto{
  @ApiProperty({example: "Fix a bug", description: "Task text"})
  @IsString({message: "Text must be of type string"})
  @Length(2, 100, {message: "Text must have a length from 2 to 100 characters"})
  readonly text: string
  
  @ApiProperty({example: "true", description: "Is the task completed or not"})
  @IsBoolean({message: "IsCompleted must be of type boolean"})
  readonly isCompleted: boolean
  
  @ApiProperty({example: "1", description: "ID of the user whom the task is assigned to"})
  @IsInt({message: "UserId must be of type integer"})
  readonly userId: number
  groupId?: number
}