import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TodoService } from './todo.service';
import { Todo as TodoEntity } from './todo.entity';
import { TodoDto } from './dto/todo.dto';



@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    async findAll(userID){
        return await this.todoService.findAll(userID)
    }
   
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<TodoEntity> {
        const todo = await this.todoService.findOne(id);

        if (!todo) {
            throw new NotFoundException('This task doesn\'t exist');
        }

        return todo;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() todo: TodoDto, @Request() req): Promise<TodoEntity> {
        return await this.todoService.create(todo, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() todo: TodoDto, @Request() req): Promise<TodoEntity> {
        const { numberOfAffectedRows, updatedTodo } = await this.todoService.update(id, todo, req.user.id);
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This task doesn\'t exist');
        }

        return updatedTodo;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        const deleted = await this.todoService.delete(id, req.user.id);
        if (deleted === 0) {
            throw new NotFoundException('This task doesn\'t exist');
        }
        return 'Successfully deleted';
    }

}
