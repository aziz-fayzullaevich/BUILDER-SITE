import {
  Title, Text, Button, Container, SimpleGrid,
  Paper, Group, ThemeIcon, Stack
} from '@mantine/core';
import {
  IconPlus, IconLayout2, IconArrowRight,
  IconBolt
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../shared/constants/routes';

const HomePage = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Всего сайтов', value: '0', icon: <IconLayout2 size={20} />, color: 'blue' },
    { title: 'Опубликовано', value: '0', icon: <IconBolt size={20} />, color: 'orange' },
  ];

  return (
    <Container size="lg" >
      <SimpleGrid cols={{ base: 1, sm: 2 }} mb={40}>
        {stats.map((stat) => (
          <Paper key={stat.title} withBorder p="md" radius="md">
            <Group justify="space-between">
              <div>
                <Text c="dimmed" tt="uppercase" fw={700} size="xs">
                  {stat.title}
                </Text>
                <Text fw={700} size="xl">
                  {stat.value}
                </Text>
              </div>
              <ThemeIcon color={stat.color} variant="light" size={38} radius="md">
                {stat.icon}
              </ThemeIcon>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>
      <Paper
        p={40}
        radius="lg"
        mb={40}
        style={{
          background: '#585858e5',
          color: 'white',
        }}
      >
        <Stack gap="md">
          <Title order={1} size={42} fw={900}>
            Создайте свой идеальный сайт за считанные минуты
          </Title>
          <Text size="xl" opacity={0.8} maw={600}>
            Используйте мощные инструменты визуального редактирования, перетаскивайте блоки и настраивайте стили без единой строчки кода.
          </Text>
          <Group mt="xl">
            <Button
              size="lg"
              variant="white"
              leftSection={<IconPlus size={20} />}
              onClick={()=>navigate(ROUTES.MY_SITES)}
            >
              Создать новый сайт
            </Button>
            <Button size="lg" variant="outline" color="white" rightSection={<IconArrowRight size={20} />} onClick={()=>navigate(ROUTES.MY_SITES)}>
              Мои проекты
            </Button>
          </Group>
        </Stack>
      </Paper>

    </Container>
  );
};

export default HomePage;