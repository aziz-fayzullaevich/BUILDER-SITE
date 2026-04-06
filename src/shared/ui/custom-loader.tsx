import { Center, Loader, Stack, Title } from "@mantine/core";

export const CustomLoader = () => {
    return (
        <Center h={'80vh'}>
            <Stack align="center">
                <Loader color="gray" size="md" type="bars" />
                <Title order={4} c="gray">Загрузка...</Title>
            </Stack>
        </Center>
    )
};