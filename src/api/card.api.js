import apiInstance from './axios.config';

export const cardApi = {
    createCard: async (title, listId) => {
        try {
            const res = await apiInstance.post('/cards', { title, listId });

            return res.data;
        } catch (e) {
            console.log(e);
        }
    },
    updateCard: async (listId, title) => {
        try {
            const res = await apiInstance.put(`/cards/${ listId }`, { title, listId });

            return res.data;
        } catch (e) {
            console.log(e);
        }
    },
    deleteCard: async (cardId) => {
        try {
            const res = await apiInstance.delete(`/cards/${ cardId }`);

            return res.data;
        } catch (e) {
            console.log(e);
        }
    }
};
