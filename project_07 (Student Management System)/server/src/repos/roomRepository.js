import Room from '../models/room.js';

class RoomRepository {
  async findAll() {
    return await Room.find().populate('teacher').populate('student');
  }

  async findById() {
    return await Room.findById(id).populate('teacher').populate('student');
  }

  async create(roomData) {
    return await Room.create(roomData);
  }

  async update(id, updateData) {
    return await Room.findByIdAndUpdate(id, updateData, { new: true })
      .populate('teacher')
      .populate('student');
  }

  async delete(id) {
    return await Room.findByIdAndDelete(id);
  }
}

export default new RoomRepository();
