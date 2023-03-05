import { IsString, Length, IsBoolean, IsInt } from "class-validator"

export class CreateTodoDto{
  @IsString({message: "Text must be of type string"})
  @Length(2, 100, {message: "Text must have a length from 2 to 100 characters"})
  readonly text: string
  @IsBoolean({message: "IsCompleted must be of type boolean"})
  readonly isCompleted: boolean
  @IsInt({message: "UserId must be of type integer"})
  readonly userId: number
  groupId?: number
}