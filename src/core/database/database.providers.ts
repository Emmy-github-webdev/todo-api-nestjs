import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DATABASENAME } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../users/user.entity';
import { Todo } from '../../todo/todo.entity';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DATABASENAME:
           config = databaseConfig.databaseName;
           break;
        
        default:
           config = databaseConfig.databaseName;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([User, Todo]);
        await sequelize.sync();
        return sequelize;
    },
}];