import { Test } from "@nestjs/testing"
import { AppModule } from "src/app.module"
import { SubtaskService } from "./subtask.service"

describe('SubtaskService', ()=>{
  let service
  beforeAll(async ()=>{
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    service = moduleRef.get(SubtaskService)
  })

  it('should be defined', async()=>{
    expect(service).toBeDefined()
  })
})