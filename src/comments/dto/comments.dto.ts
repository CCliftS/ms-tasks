import { IsNotEmpty, IsString } from "class-validator";

export class CommentDTO{
    @IsString()
    @IsNotEmpty()
    id_task: string;

    @IsString()
    @IsNotEmpty()
    email_user: string;

    @IsString()
    @IsNotEmpty()
    comment: string;
}