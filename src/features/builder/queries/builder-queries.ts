import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { builderApi } from "../api/builder-api"
import { notifications } from "@mantine/notifications";

export const builderQueries = {
    useGet: () => {
        return useQuery({
            queryKey: ['builder-data'],
            queryFn: builderApi.get,
        });
    },

    useSave: () => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: ({ elements }: { elements: any[] }) => builderApi.save({ elements }),

            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['builder-data'] });

                notifications.show(
                    {
                        title: 'Успех',
                        message: 'Сайт сохранен!',
                        color: 'green'
                    }

                );
            },

            onError: () => {
                notifications.show(
                    {
                        title: 'Ошибка',
                        message: 'Не удалось сохранить!',
                        color: 'red'

                    }
                );
            },
        });
    },
};