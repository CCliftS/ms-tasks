import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDTO } from './dto/tasks.dto';
import { Task } from './schema/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';

const GetTeam = async (idTeam: string) => {
  try {
    const response = axios.get(`${process.env.MS_TEAMS}/Teams/findTeamById/${idTeam}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const GetUser = async (email: string) => {
  try {
    const response = axios.get(`${process.env.MS_USERS}/user/data/${email}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const GetProject = async (idProject: string) => {
  console.log(idProject);
  try {
    const response = axios.get(`${process.env.MS_TEAMS}/Project/findOneProject/${idProject}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

@Injectable()

export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>,
  ) { }

  async create(taskDTO: TaskDTO): Promise<Task> {
    const Team = await GetTeam(taskDTO.id_team);
    const Project = await GetProject(taskDTO.id_project);
    const User = await GetUser(taskDTO.email_user);
    if (Team && Project && User) {
      const task = new this.taskModel(taskDTO);
      return await task.save();
    } else {
      throw new NotFoundException('Team or Project not found');
    }
  }

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    return await this.taskModel.findOne({ _id: id }).exec();
  }

  async updateStatus(id: string, newStatus: string): Promise<Task> {
    if (newStatus != 'to do' && newStatus != 'doing' && newStatus != 'done') throw new NotFoundException('Status not found');
    if (this.taskModel.findById(id)) {
      return await this.taskModel.findOneAndUpdate({ id: id }, { status: newStatus }, { new: true });
    }
    else {
      throw new NotFoundException('Task not found');
    }
  }

  async updateDescription(id: string, newDescription: string): Promise<Task> {
    if (newDescription.length > 500) throw new NotFoundException('Description too long');
    if (this.taskModel.findById(id)) {
      return await this.taskModel.findOneAndUpdate({ id: id }, { description: newDescription }, { new: true });
    }
    else {
      throw new NotFoundException('Task not found');
    }
  }

  async updateName(id: string, newName: string): Promise<Task> {

    if (this.taskModel.findById(id)) {
      return await this.taskModel.findOneAndUpdate({ id: id }, { name: newName }, { new: true });
    }
    else {
      throw new NotFoundException('Task not found');
    }

  }

  async remove(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndRemove(id);
  }

  async getProjectTasks(idProject: string): Promise<{ taskId: string[], taskDescription: string[], taskEmailUser: string[], taskFinishDate: Date[], taskIdProject: string[], taskIdTeam: string[], taskName: string[], taskStartDate: Date[], taskStatus: string[] }> {
    const tasks = await this.taskModel.find({ id_project: idProject });
    const taskId = tasks.map(task => task.id);
    const taskDescription = tasks.map(task => task.description);
    const taskEmailUser = tasks.map(task => task.email_user);
    const taskFinishDate = tasks.map(task => task.finish_date);
    const taskIdProject = tasks.map(task => task.id_project);
    const taskIdTeam = tasks.map(task => task.id_team);
    const taskName = tasks.map(task => task.name);
    const taskStartDate = tasks.map(task => task.start_date);
    const taskStatus = tasks.map(task => task.status);
    return { taskId, taskDescription, taskEmailUser, taskFinishDate, taskIdProject, taskIdTeam, taskName, taskStartDate, taskStatus };
  }

  async getTaskByUser(email: string): Promise<Task[]> {
    if (GetUser(email)) {
      return await this.taskModel.find({ email_user: email });
    }
    else {
      throw new NotFoundException('User not found');
    }
  }

  async getTaskByTeam(idTeam: string): Promise<Task[]> {
    if (GetTeam(idTeam)) {
      return await this.taskModel.find({ id_team: idTeam });
    }
    else {
      throw new NotFoundException('Team not found');
    }
  }

  async getTaskByProject(idProject: string): Promise<Task[]> {
    if (GetProject(idProject)) {
      return await this.taskModel.find({ id_project: idProject });
    }
    else {
      throw new NotFoundException('Project not found');
    }
  }
}
