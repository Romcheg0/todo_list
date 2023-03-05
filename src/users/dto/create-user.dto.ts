import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length } from "class-validator"

export class CreateUserDto{
  @ApiProperty({example: "John", description: "User name"})
  @IsString({message: "Username must be of type string"})
  @Length(4, 16, {message: "Username must have a length from 4 to 16 characters"})
  readonly username: string
  @ApiProperty({example: "John1234", description: "User password"})
  @IsString({message: "Password must be of type string"})
  @Length(8, 20, {message: "Password must have a length from 8 to 20 characters"})
  readonly password: string
}