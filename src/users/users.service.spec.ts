import { Test } from "@nestjs/testing"
import { AppModule } from "src/app.module"
import { UsersService } from "./users.service"

describe('UsersService', ()=>{
  let service
  beforeAll(async ()=>{
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    service = moduleRef.get(UsersService)
  })

  it('should be defined', async()=>{
    expect(service).toBeDefined()
  })
})