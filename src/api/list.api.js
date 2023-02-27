import apiInstance from './axios.config.js';

export const listApi = {
    getAllLists: async () => {
        try {
            const res = await apiInstance.get('/lists');

            return res.data;
        } catch (e) {
            console.log(e);
        }
    },
    createList: async (title) => {
        try {
            const res = await apiInstance.post('/lists', { title });

            return res.data;
        } catch (e) {
            console.log(e);
        }
    },
    deleteList: async (listId) => {
        try {
            const res = await apiInstance.delete(`/lists/${ listId }`);

            return res.data;
        } catch (e) {
            console.log(e);
        }
    }
};
