import { Stack, Center } from "@mantine/core";
import { useBuilderStore } from "../../model/use-builder-stoe";
import { RenderElement } from "../render-element";

export const Canvas = () => {
  const elements = useBuilderStore((state) => state.elements);

  if (elements.length === 0) {
    return (
      <Center h="80vh" c="dimmed" opacity={0.4} style={{ fontSize: 25, userSelect: 'none' }}>
        Перетащите элемент сюда
      </Center>
    );
  }

  return (
    <Stack gap="md" align="stretch" p={'lg'}>
      {elements.map((element) => (
        <RenderElement key={element.id} element={element} />
      ))}
    </Stack>
  );
};