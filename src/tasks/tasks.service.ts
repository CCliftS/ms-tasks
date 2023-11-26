import { Injectable } from '@nestjs/common';
import { TaskDTO } from './dto/tasks.dto';
import { Task } from './schema/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}
  
  async create(taskDTO: TaskDTO): Promise<Task> {
    const task = new this.taskModel(taskDTO);
    return await task.save();
  }

  async findAll():Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    return await this.taskModel.findOne({id: id}).exec();
  }

  async update(id: string, taskDTO: TaskDTO): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(id, taskDTO);
  }

  async remove(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndRemove(id);
  }
}
