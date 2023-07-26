import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entitiy';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {

    async getAllBoards() {
        return await Board.find();
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const { title, description } = createBoardDto

        const board = Board.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })

        return await Board.save(board)
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await Board.getBoardById(id);

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    async deleteBoard(id: number, user: User): Promise<void> {
        const board = await Board.findOne({where: { id }, relations: ['user']})
        if (!board) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
        const authorId = board.user.id
        if (authorId === user.id) {
            Board.delete(id)
        } else {
            throw new UnauthorizedException(`Can't find Board with id ${id}`)
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await Board.save(board)
        return board;
    }
}