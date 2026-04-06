import { api } from "../../../shared/api/build-api";

export const builderApi = {
    get: async () => {
        const { data } = await api.get('/builder/1');
        return data;
    },
    save: async ({ elements }: { elements: any[] }) => {
        const { data } = await api.patch('/builder/1', { elements });
        return data;
    }
};