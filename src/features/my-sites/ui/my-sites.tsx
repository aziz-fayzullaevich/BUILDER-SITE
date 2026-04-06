import { Paper } from "@mantine/core";
import { CustomLoader } from "../../../shared/ui/custom-loader";
import { mySitesQueries } from "../queries/my-sites-queries"

export const MySites = () => {
    const { data: sites, isLoading } = mySitesQueries.useGet();

    if (isLoading) return <CustomLoader />

    return (
        <Paper>
            111
        </Paper>
    )
}