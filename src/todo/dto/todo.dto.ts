import { IsNotEmpty, MinLength } from "class-validator";
import { Is } from "sequelize-typescript";

enum Status {
    LOGGED = 'logged',
    INPROGRESS = 'in-progres',
    FINISHED = 'finished'
}

export class TodoDto {
    @IsNotEmpty()
    @MinLength(5)
    readonly title: string;

    @IsNotEmpty()
    readonly description: string;

    readonly status: Status;

    @IsNotEmpty()
    readonly finish_at: Date;
}