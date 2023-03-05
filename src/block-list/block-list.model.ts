import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Table, Column } from "sequelize-typescript";

@Table({tableName: "block_list"})
export class BlockList extends Model<BlockList>{
  @ApiProperty({example: "1", description: "ID of blocked token"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @ApiProperty({example: "eyRfdsg12feE...", description: "blocked JWT token"})
  @Column({type: DataType.STRING, allowNull: false, unique: true })
  token: string;
}