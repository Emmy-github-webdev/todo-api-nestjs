import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { todoProviders } from './todo.providers';

@Module({
  providers: [TodoService, ...todoProviders],
  controllers: [TodoController]
})
export class TodoModule {}
