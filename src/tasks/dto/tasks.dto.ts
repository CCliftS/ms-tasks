import { IsNotEmpty, IsString } from "class-validator";

export class TaskDTO{
    @IsString()
    @IsNotEmpty()
    id: string;

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
}