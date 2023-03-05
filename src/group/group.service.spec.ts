import { Test } from "@nestjs/testing"
import { AppModule } from "src/app.module"
import { GroupService } from "./group.service"

describe('GroupService', ()=>{
  let service
  beforeAll(async ()=>{
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    service = moduleRef.get(GroupService)
  })

  it('should be defined', async()=>{
    expect(service).toBeDefined()
  })
})