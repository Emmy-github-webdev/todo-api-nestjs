import { Injectable, Inject } from '@nestjs/common';
import { User } from '../users/user.entity';
import { Todo } from './todo.entity';
import { TodoDto } from './dto/todo.dto';
import { TODO_REPOSITORY } from '../core/constants';

@Injectable()
export class TodoService {
    constructor(@Inject( TODO_REPOSITORY) private readonly todoRepository: typeof Todo) { }

    async create(todo: TodoDto, userID): Promise<Todo> {
        return await this.todoRepository.create<Todo>({ ...todo, userID });
    }

    async findAll(userID): Promise<Todo[]> {
        return await this.todoRepository.findAll<Todo>({ 
            where: { userID },
            include: [{ model: User, attributes: {exclude: ['password']}}]
        });
    }

    async findOne(id): Promise<Todo> {
        return await this.todoRepository.findOne<Todo>({
            where: { id },
            include: [{ model: User, attributes: {exclude: ['password']}}]
        });
    }

    async delete(id, userID){
        return await this.todoRepository.destroy({
            where: {
                id,
                userID
            }
        });
    }

    async update(id, data, userID){
       const [numberOfAffectedRows, [updatedTodo]] = await this.todoRepository.update(
           {...data},
           {where: { id, userID}, returning: true }
       );
       return { numberOfAffectedRows, updatedTodo };
    }
}
