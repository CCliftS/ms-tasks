import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, Comments } from './schema/comment.schema';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Comments.name,
        schema: CommentSchema,
      }
    ]
    ),
    TasksModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
