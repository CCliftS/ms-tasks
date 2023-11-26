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

  /*
    Falta poner que se va  actualizar
  */
 
  @Post('updateTask')
  update(@Body('id') id: string, taskDTO: TaskDTO) {
    return this.tasksService.update(id, taskDTO);
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
