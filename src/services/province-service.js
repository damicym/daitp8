import ProvinceRepository from '../repositories/province-repository.js';

export default class ProvinceService {
  // Clase con lógica de negocio.
  getAllAsync = async () => {
    const repo = new ProvinceRepository();
    const returnArray = await repo.getAllAsync();
    return returnArray;
  };

  getByIdAsync = async (id) => {
    // .../* hacerlo */...
  };

  createAsync = async (entity) => {
    // .../* hacerlo */...
  };

  updateAsync = async (entity) => {
    // .../* hacerlo */...
  };

  deleteByIdAsync = async (id) => {
    // .../* hacerlo */...
  };
}
