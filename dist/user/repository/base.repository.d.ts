import { Document, Model } from 'mongoose';
import { IBaseRepository } from './IBaseRepository';
export declare abstract class BaseRepository<T extends Document> implements IBaseRepository<T> {
    protected readonly model: Model<T>;
    constructor(model: Model<T>);
    create(data: Partial<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
    findAll(filter: string): Promise<T[]>;
    findOne(filter: string): Promise<T | null>;
}
