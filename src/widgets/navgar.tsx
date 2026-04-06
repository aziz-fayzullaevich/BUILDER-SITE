import { NavLink, Stack, Box } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAVBAR_LINKS } from '../shared/constants/navbar-links';

export const Navbar = ({ onClick }: { onClick: () => void }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleClick = (link: string) => {
        navigate(link);

        if (onClick) {
            onClick()
        };
    };

    return (
        <Box h="100%" display="flex" style={{ flexDirection: 'column' }}>
            <Stack gap={4} flex={1}>
                {NAVBAR_LINKS.map((item) => (
                    <NavLink
                        key={item.link}
                        active={pathname === item.link}
                        label={item.label}
                        leftSection={<item.icon size="1.2rem" stroke={1.5} />}
                        onClick={() => handleClick(item.link)}
                        variant="filled"
                    />
                ))}
            </Stack>
        </Box>
    );
};