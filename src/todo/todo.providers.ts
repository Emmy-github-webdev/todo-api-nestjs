import { Todo } from "./todo.entity";
import { TODO_REPOSITORY } from '../core/constants'

export const todoProviders = [{
    provide: TODO_REPOSITORY,
    useValue: Todo,
}];