import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CommentDocument = HydratedDocument<Comments>;
@Schema()

export class Comments {
    @Prop({ required: true })
    id_task: string;

    @Prop({ required: true })
    email_user: string;

    @Prop({ required: true })
    comment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comments);
