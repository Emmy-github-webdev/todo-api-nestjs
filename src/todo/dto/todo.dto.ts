import { IsNotEmpty, MinLength, IsEnum } from "class-validator";

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

    @IsNotEmpty()
    @IsEnum(Status, {
        message: 'Status must be either logged, in-progress or finished',
    })
    readonly status: Status;

    @IsNotEmpty()
    readonly finish_at: Date;
}