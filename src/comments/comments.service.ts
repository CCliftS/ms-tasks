import { Injectable } from '@nestjs/common';
import { CommentDTO } from './dto/comments.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments } from './schema/comment.schema';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comments.name) private commentModel: Model<Comments>) {}
  private readonly taskService: TasksService

  async create(commentDTO: CommentDTO): Promise<Comments> {
    const comment = new this.commentModel(commentDTO);
    return await comment.save();
  }

  async findAll(): Promise<Comments[]> {
    return await this.commentModel.find().exec();
  }

  async findOne(id: string): Promise<Comments> {
    return await this.commentModel.findOne({id: id}).exec();
  }

  async updateComment(id: string, Newcomment: string): Promise<Comments> {
    if(this.taskService.findOne(id)){
      return await this.commentModel.findByIdAndUpdate(id, {comment: Newcomment}, {new: true});
    }
  }

  async getCommentsByTask(id_task: string): Promise<{ commentIdTask:string[], commentEmailUser: string[], commentComment: string[] }> {
    const comments = await this.commentModel.find({id_task: id_task}).exec();
    const commentIdTask = comments.map(comments => comments.id_task);
    const commentEmailUser = comments.map(comments => comments.email_user);
    const commentComment = comments.map(comments => comments.comment);
    return { commentIdTask, commentEmailUser, commentComment }
  }

  async remove(id: string): Promise<Comments> {
    return await this.commentModel.findByIdAndRemove(id);
  }
}
