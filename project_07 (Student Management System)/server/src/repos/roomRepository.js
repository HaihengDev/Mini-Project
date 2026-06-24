import Room from '../models/room.js';

class RoomRepository {
  async findAll() {
    return await Room.find();
  }

  async findById() {
    return await Room.findById(id);
  }

  async create(roomData) {
    return await Room.create(roomData);
  }

  async update(id, updateData) {
    return await Room.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await Room.findByIdAndDelete(id);
  }
}

export default new RoomRepository();
