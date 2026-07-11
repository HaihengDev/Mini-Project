import roomRepository from '../repositories/roomRepos.js';

class RoomService {
  async getAll() {
    return await roomRepository.findAll();
  }

  async getById(id) {
    return await roomRepository.findById(id);
  }
}

export default new RoomService();
