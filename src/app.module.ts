import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [TasksModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
