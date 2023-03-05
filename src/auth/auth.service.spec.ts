import { Test } from "@nestjs/testing"
import { AppModule } from "src/app.module"
import { AuthService } from "./auth.service"

describe('AuthService', ()=>{
  let authService
  beforeAll(async ()=>{
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    authService = moduleRef.get(AuthService)
  })

  it('should be defined', async()=>{
    expect(authService).toBeDefined()
  })
})