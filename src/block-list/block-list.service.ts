import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BlockList } from './block-list.model';

@Injectable()
export class BlockListService {
  constructor(@InjectModel(BlockList) private blockListRepository: typeof BlockList){}

  async createBlockList(token: string){
    const blockedToken = await this.blockListRepository.create({token: token})
    return blockedToken
  }
  async getAll(){
    const blockedTokens = await this.blockListRepository.findAll()
    return blockedTokens
  }
}
