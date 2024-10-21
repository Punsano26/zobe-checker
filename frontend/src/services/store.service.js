import api from "./api";
const STO_API = import.meta.env.VITE_STO_API;

//get all Stores
const getAllStores = async () => {
    return await api.get(STO_API);
}

const getStoreById = async (id) => {
    return await api.get(`${STO_API}/${id}`);
}

const updateStore = async (id, store) => {
    return await api.put(`${STO_API}/${id}`, store);
}

const deleteStore = async (id) => {
    return await api.delete(`${STO_API}/${id}`);
}

const addStore = async (store) => {
    return await api.post(STO_API, store);
}


const StoresService = {
    getAllStores,
    getStoreById,
    updateStore,
    deleteStore,
    addStore
}

export default StoresService;



