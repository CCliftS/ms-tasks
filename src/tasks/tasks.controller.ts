import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDTO } from './dto/tasks.dto';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('createTask')
  create(@Body() taskDTO: TaskDTO) {
    return this.tasksService.create(taskDTO);
  }

  @Post('updateDescription')
  updateDescription(@Body('id') id: string, newDescription: string) {
    return this.tasksService.updateDescription(id, newDescription);
  }
  
  @Post('updateName')
  updateName(@Body('id') id: string, newName: string) {
    return this.tasksService.updateName(id, newName);
  }
 
  @Post('updateTask')
  update(@Body('id') id: string, newStatus: string) {
    return this.tasksService.updateStatus(id, newStatus);
  }

  @Get('findAllTasks')
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('findTaskById/:id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Delete('removeTask/:id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
