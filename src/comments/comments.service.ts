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
  
    if(this.taskService.findOne(commentDTO.id_task)){
      const comment = new this.commentModel(commentDTO);
      return await comment.save();
    }

  }

  async findAll(): Promise<Comments[]> {
    return await this.commentModel.find().exec();
  }

  async findOne(id: string): Promise<Comments> {
    return await this.commentModel.findOne({id: id}).exec();
  }

  async update(id: string, commentDTO: CommentDTO): Promise<Comments> {
    
    if(this.taskService.findOne(commentDTO.id_task)){
      return await this.commentModel.findByIdAndUpdate(id, commentDTO);
    }
    
  }

  async remove(id: string): Promise<Comments> {
    return await this.commentModel.findByIdAndRemove(id);
  }
}
