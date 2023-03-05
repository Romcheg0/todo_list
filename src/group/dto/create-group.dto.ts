import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length, IsInt } from "class-validator"

export class CreateGroupDto{
  @ApiProperty({example: "My todos", description: "Group name"})
  @IsString({message: "Name must be of type string"})
  @Length(2, 32, {message: "Name must have a length from 2 to 32 characters"})
  readonly name: string
  @ApiProperty({example: "1", description: "ID of user whom this group is assigned to"})
  @IsInt({message: "User ID must be of type integer"})
  readonly userId: number
}