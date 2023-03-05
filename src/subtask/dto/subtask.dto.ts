import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length, IsBoolean, IsInt } from "class-validator"

export class CreateSubtaskDto{
  @ApiProperty({example: "Perform a swiper", description: "Text of subtask"})
  @IsString({message: "Text must be of type string"})
  @Length(2, 100, {message: "Text must have a length from 2 to 100 characters"})
  readonly text: string
  
  @ApiProperty({example: "true", description: "Is subtask completed or not"})
  @IsBoolean({message: "IsCompleted must be of type boolean"})
  readonly isCompleted: boolean
  
  @ApiProperty({example: "2", description: "ID of todo which the subtask is assigned to"})
  @IsInt({message: "TodoId must be of type integer"})
  readonly todoId: number
}