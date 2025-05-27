"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        const entity = new this.model(data);
        return entity.save();
    }
    async findById(id) {
        return this.model.findById(id);
    }
    async update(id, data) {
        return this.model.findByIdAndUpdate(id, { $set: data });
    }
    async delete(id) {
        return this.model.findByIdAndDelete(id);
    }
    async findAll(filter) {
        return this.model.find({ filter });
    }
    async findOne(filter) {
        return this.model.findOne({ filter });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map