import {Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Todo extends Model<Todo> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @Column({
        type: DataType.ENUM,
        values: ['logged', 'in-progress', 'finished'],
        allowNull: false,
    })
    status: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userID: number;

    @BelongsTo(() => User)
    user: User;

    @Column({
        type: DataType.DATE,
    })
    completed_at: Date;
}