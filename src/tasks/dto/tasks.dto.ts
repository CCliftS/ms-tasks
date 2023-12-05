import { IsNotEmpty, IsString } from "class-validator";

export class TaskDTO{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    id_team: string;

    @IsString()
    @IsNotEmpty()
    id_project: string;

    @IsString()
    start_date: Date;

    @IsString()
    finish_date: Date;
}