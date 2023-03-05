import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { GroupController } from './group.controller';


describe('GroupController', () => {
  let controller: GroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    controller = module.get<GroupController>(GroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});