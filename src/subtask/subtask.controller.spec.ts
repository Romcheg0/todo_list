import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { SubtaskController } from './subtask.controller';


describe('SubtaskController', () => {
  let controller: SubtaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    controller = module.get<SubtaskController>(SubtaskController);
  }, 20000);

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});