import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDTO } from './dto/tasks.dto';
import { Task } from './schema/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';

const GetTeam = async (idTeam: string) => {
  try {
    const response = axios.get(`${process.env.MS_TEAMS}/Teams/findTeamById/'${idTeam}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const GetProject = async (idProject: string) => {
  try {
    const response = axios.get(`${process.env.MS_TEAMS}/Project/findOneProject/'${idProject}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

@Injectable()

export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async create(taskDTO: TaskDTO): Promise<Task> {
    const Team = await GetTeam(taskDTO.id_team);
    const Project = await GetProject(taskDTO.id_project);
    if (Team && Project) {
      const task = new this.taskModel(taskDTO);
      return await task.save();
    }else{
      throw new NotFoundException('Team or Project not found');
    }
  }

  async findAll():Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    return await this.taskModel.findOne({id: id}).exec();
  }

  async updateStatus(id: string, newStatus: string): Promise<Task> {
    if(newStatus != 'to do' && newStatus != 'doing' && newStatus != 'done') throw new NotFoundException('Status not found');
    if(this.taskModel.findById(id)){
      return await this.taskModel.findOneAndUpdate({id: id}, {status: newStatus}, {new: true});
    }
    else{
      throw new NotFoundException('Task not found');
    }
  }

  async updateDescription(id: string, newDescription: string): Promise<Task> {
    if(newDescription.length > 500) throw new NotFoundException('Description too long');
    if(this.taskModel.findById(id)) {
      return await this.taskModel.findOneAndUpdate({id: id}, {description: newDescription}, {new: true});
    }
    else{
      throw new NotFoundException('Task not found');
    }
  }

  async updateName(id: string, newName: string): Promise<Task> {

    if(this.taskModel.findById(id)) {
      return await this.taskModel.findOneAndUpdate({id: id}, {name: newName}, {new: true});
    }
    else{
      throw new NotFoundException('Task not found');
    }
    
  }

  async remove(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndRemove(id);
  }
}
