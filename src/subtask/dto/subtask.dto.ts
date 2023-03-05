import { IsString, Length, IsBoolean, IsInt } from "class-validator"

export class CreateSubtaskDto{
  @IsString({message: "Text must be of type string"})
  @Length(2, 100, {message: "Text must have a length from 2 to 100 characters"})
  readonly text: string
  @IsBoolean({message: "IsCompleted must be of type boolean"})
  readonly isCompleted: boolean
  @IsInt({message: "TodoId must be of type integer"})
  readonly todoId: number
}