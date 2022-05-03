
import { TodoDto } from "./todo.dto";

export class UpdateTodoDto extends TodoDto {
    finished_at: Date;
}