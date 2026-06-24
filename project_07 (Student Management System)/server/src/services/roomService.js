import roomRepository from '../repos/roomRepository.js';

class RoomService {
  async getAllRooms() {
    return await roomRepository.findAll();
  }

  async getRoomById(id) {
    const room = await roomRepository.findById(id);

    if (!room) {
      throw new Error('Room Not found!');
    }

    return room;
  }

  async createRoom(roomData) {
    return await roomRepository.create(roomData);
  }

  async updateRoom(id, updatedData) {
    return await roomRepository.update(id, updatedData);
  }

  async deleteRoom(id) {
    return await roomRepository.delete(id);
  }
}

export default new RoomService();
