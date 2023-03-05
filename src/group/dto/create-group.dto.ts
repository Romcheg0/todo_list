import { IsString, Length, IsInt } from "class-validator"

export class CreateGroupDto{
  @IsString({message: "Name must be of type string"})
  @Length(2, 32, {message: "Name must have a length from 2 to 32 characters"})
  readonly name: string
  @IsInt({message: "User ID must be of type integer"})
  readonly userId: number
}