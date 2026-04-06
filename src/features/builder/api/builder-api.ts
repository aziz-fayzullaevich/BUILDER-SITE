import { api } from "../../../shared/api/build-api";

export const builderApi = {
    save: async ({ elements }: { elements: any[] }) => {
        const { data } = await api.patch('/builder/1', { elements });
        return data;
    }
};