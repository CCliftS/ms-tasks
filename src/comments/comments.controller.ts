import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDTO } from './dto/comments.dto';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('createComment')
  create(@Body() commentDTO: CommentDTO) {
    return this.commentsService.create(commentDTO);
  }

  @Get('findAllComments')
  findAll() {
    return this.commentsService.findAll();
  }

  @Get('findOneComment/:id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  /*
  Falta poner que se va  actualizar
  */

  @Post('updateComment')
  update(@Body('id') id: string, commentDTO: CommentDTO) {
    return this.commentsService.update(id, commentDTO);
  }

  @Delete('removeComment/:id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
