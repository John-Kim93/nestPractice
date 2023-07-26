import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './boards/board.entitiy';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule, AuthModule],
  // imports: [BoardsModule],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
