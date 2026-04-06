import { api } from "../../../shared/api/build-api";

export const mySitesApi = {
    get: async () => {
        const { data } = await api.get('/builder/1');
        return data;
    },
};