import * as mongoose from "mongoose"

export class MongoDao<T extends mongoose.Document>{
    private model : mongoose.Model<T>

    constructor(model : mongoose.Model<T>){
        this.model = model
    }

    getModel() : mongoose.Model<T>{
        return this.model;
    }

    async findAll(projectionObject : Object | {}){
        let data = await this.model.find({}, projectionObject);
        return data;
    }

    async findOne(id: any) {
        let data = await this.model.findById(id);
        return data
    }

    async findOneByFields(fields : Object){
        let data = await this.model.find(fields)
        return data
    }

    async create(entity: T) {
        await this.model.create(entity);
    }

    async update(selectionCriteria : Object, updates : Object) {
        await this.model.findOneAndUpdate(selectionCriteria, updates)
    }

    async delete(selectionCriteria : Object) {
        return await this.model.findOneAndDelete(selectionCriteria)
    }
}