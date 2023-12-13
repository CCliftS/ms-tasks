import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDTO } from './dto/tasks.dto';

@Controller('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post('createTask')
  create(@Body() taskDTO: TaskDTO) {
    return this.tasksService.create(taskDTO);
  }

  @Put('updateDescription/:id')
  updateDescription(@Param('id') id: string, @Body('newDescription') newDescription: string) {
    return this.tasksService.updateDescription(id, newDescription);
  }

  @Put('updateName/:id')
  updateName(@Param('id') id: string, @Body('newName') newName: string) {
    return this.tasksService.updateName(id, newName);
  }

  @Put('updateStatus/:id')
  update(@Param('id') id: string, @Body('newStatus') newStatus: string) {
    return this.tasksService.updateStatus(id, newStatus);
  }

  @Put('updateTeamAndEmailUser/:id')
  updateTeamAndEmailUser(@Param('id') id: string, @Body('id_team') id_team: string, @Body('email_user') email_user: string) {
    return this.tasksService.updateTeamAndEmailUser(id, id_team, email_user);
  }

  @Put('updateFinishDate/:id')
  updateFinishDate(@Param('id') id: string, @Body('newDate') newDate: Date) {
    return this.tasksService.updateFinishDate(id, newDate);
  }

  @Get('findAllTasks')
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('findTaskById/:id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Get('getProjectTasks/:id')
  getProjectTasksByStatus(@Param('id') id: string) {
    return this.tasksService.getProjectTasks(id);
  }

  @Get('findTaskByUser/:email')
  findTaskByUser(@Param('email') email: string) {
    return this.tasksService.getTaskByUser(email);
  }

  @Get('findTaskByTeam/:id')
  findTaskByTeam(@Param('id') id: string) {
    return this.tasksService.getTaskByTeam(id);
  }

  @Delete('removeTask/:id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
