import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CommentDocument = HydratedDocument<Comments>;

export class Comments {
    @Prop({required: true})
    id: string;

    @Prop({required: true})
    id_task: string;

    @Prop({required: true})
    comment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comments);
