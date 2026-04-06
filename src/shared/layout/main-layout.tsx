import { AppShell, Burger, Flex, Image, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logo from '../../assets/builder-logo.png'
import { Outlet } from "react-router-dom";
import { Navbar } from "../../widgets/navgar";

const MainLayout = () => {
    const [opened, { toggle, close }] = useDisclosure();

    return (
        <AppShell
            padding="md"
            header={{ height: 80 }}
            navbar={{
                width: 220,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
        >
            <AppShell.Header p={'xs'}>
                <Flex align={'center'} justify={'space-between'} gap={'lg'}>
                    <Flex align={'center'} gap={'sm'}>
                        <Image
                            src={logo}
                            w={'50px'}
                            h={'50px'}
                            title="logo"
                        />
                        <Title order={4}>Builder-app</Title>
                    </Flex>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="md"
                    />
                </Flex>
            </AppShell.Header>

            <AppShell.Navbar>
                <Navbar onClick={close}/>
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}

export default MainLayout;