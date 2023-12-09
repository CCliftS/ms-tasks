import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";

export type TaskDocument = HydratedDocument<Task>;

@Schema()

export class Task {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    id_team: string;

    @Prop({ required: true })
    id_project: string;

    @Prop({ required: true })
    email_user: string;

    @Prop()
    start_date: Date;

    @Prop()
    finish_date: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);