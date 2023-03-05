import { Test } from "@nestjs/testing"
import { AppModule } from "src/app.module"
import { TodoService } from "./todo.service"

describe('TodoService', ()=>{
  let service
  beforeAll(async ()=>{
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    service = moduleRef.get(TodoService)
  })

  it('should be defined', async()=>{
    expect(service).toBeDefined()
  })
})