import { Stack, Tooltip, UnstyledButton } from "@mantine/core";
import { TOOLBAR_LISTS } from "../shared/constants/toolbar-links";
import { useBuilderStore } from "../features/builder/model/use-builder-stoe";

export const Toolbar = () => {
  const addElement = useBuilderStore(state => state.addElement);

  return (
    <nav>
      <Stack justify="center" gap={20} p="xs">
        {TOOLBAR_LISTS.map((item) => (
          <Tooltip label={item.label} position="right" transitionProps={{ duration: 0 }} key={item.label}>
            <UnstyledButton
              onClick={() => addElement(item.label.toLowerCase() as any)}
              style={(theme) => ({
                borderRadius: theme.radius.md,
                '&:hover': { backgroundColor: theme.colors.gray[0] }
              })}
            >
              <item.icon style={{ width: '24px', height: '24px' }} stroke={1.5} />
            </UnstyledButton>
          </Tooltip>
        ))}
      </Stack>
    </nav>
  )
};