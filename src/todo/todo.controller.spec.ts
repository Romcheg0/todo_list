import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { TodoController } from './todo.controller';


describe('TodoController', () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});