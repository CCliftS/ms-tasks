import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDTO } from './dto/comments.dto';

@Controller('Comments')
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

  @Put('updateComment/:id')
  update(@Param('id') id: string, @Body('newcomment') newcomment: string) {
    return this.commentsService.updateComment(id, newcomment);
  }

  @Delete('removeComment/:id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
