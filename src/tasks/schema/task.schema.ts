import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument} from "mongoose";

export type TaskDocument = HydratedDocument<Task>;

@Schema()

export class Task {
    @Prop({required: true})
    id: string;
    
    @Prop({required: true})
    name: string;
    
    @Prop({required: true})
    status: string;

    @Prop({required: true})
    description: string;
    
    @Prop({required: true})
    id_team: string;
    
    @Prop({required: true})
    id_project: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);