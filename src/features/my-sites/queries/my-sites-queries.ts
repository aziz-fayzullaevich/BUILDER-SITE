import { useQuery } from "@tanstack/react-query";
import { mySitesApi } from "../api/my-sites-api";

export const mySitesQueries = {
    useGet: () => {
        return useQuery({
            queryKey: ['builder-data'],
            queryFn: mySitesApi.get,
        });
    },
};