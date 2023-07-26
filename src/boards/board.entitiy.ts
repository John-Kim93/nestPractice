import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { User } from "src/auth/user.entity";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;

    @ManyToOne(type => User, user => user.boards, {eager: false, nullable: false})
    // @JoinColumn({ name: 'userId', referencedColumnName: 'id'})
    user: User

    static getBoardById(id: number) {
        return this.findOne({where: { id }})
    }
}