import {
  Stack, TextInput, ColorInput, NumberInput,
  Select, Title, Divider, Flex, ActionIcon,
  Button,
  Tabs,
  Group,
  FileButton,
  Text
} from "@mantine/core";
import { IconLink, IconUpload, IconX } from "@tabler/icons-react";
import { useBuilderStore } from "../../model/use-builder-stoe";

export const Inspector = () => {
  const { activeElementId, elements, updateElementProps, updateElementStyle, selectElement } = useBuilderStore();

  const findActive = (items: any[]): any => {
    for (const item of items) {
      if (item.id === activeElementId) return item;
      if (item.children) {
        const found = findActive(item.children);
        if (found) return found;
      }
    }
  };

  const activeElement = findActive(elements);

  if (!activeElement) return null;

  const handleStyleChange = (key: string, value: any) => {
    updateElementStyle(activeElement.id, { [key]: value });
  };

  return (
    <Stack gap="md">
      <Flex justify="space-between" align="center">
        <Title order={5}>Настройки: {activeElement.type.toUpperCase()}</Title>
        <ActionIcon variant="subtle" color="gray" onClick={() => selectElement(null)}>
          <IconX size={18} />
        </ActionIcon>
      </Flex>

      <Divider label="Контент" labelPosition="center" />
      {activeElement.type === 'text' && (
        <TextInput
          label="Текст"
          value={activeElement.props?.content || ''}
          onChange={(e) => updateElementProps(activeElement.id, { content: e.target.value })}
        />
      )}
      {activeElement.type === 'button' && (
        <TextInput
          label="Текст кнопки"
          value={activeElement.props?.label || ''}
          onChange={(e) => updateElementProps(activeElement.id, { label: e.target.value })}
        />
      )}
      {activeElement.type === 'image' && (
        <Tabs defaultValue="url">
          <Tabs.List grow mb="xs">
            <Tabs.Tab value="url" leftSection={<IconLink size={14} />}>URL</Tabs.Tab>
            <Tabs.Tab value="file" leftSection={<IconUpload size={14} />}>Файл</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="url">
            <TextInput
              placeholder="https://..."
              label="Ссылка на изображение"
              value={activeElement.props?.src || ''}
              onChange={(e) => updateElementProps(activeElement.id, { src: e.target.value })}
            />
          </Tabs.Panel>

          <Tabs.Panel value="file">
            <Group justify="center" mt="sm">
              <FileButton
                onChange={(file) => {
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      updateElementProps(activeElement.id, { src: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                accept="image/png,image/jpeg"
              >
                {(props) => (
                  <Button {...props} variant="light" fullWidth>
                    Выбрать с компьютера
                  </Button>
                )}
              </FileButton>
            </Group>
            {activeElement.props?.src?.startsWith('data:') && (
              <Text size="xs" c="dimmed" mt="xs" ta="center">Файл загружен локально</Text>
            )}
          </Tabs.Panel>
        </Tabs>
      )}
      {activeElement.type === 'form' && (
        <TextInput
          label="Placeholder"
          value={activeElement.props?.placeholder || ''}
          onChange={(e) => updateElementProps(activeElement.id, { placeholder: e.target.value })}
        />
      )}

      <Divider label="Геометрия и Скругление" labelPosition="center" />
      <Flex gap="xs">
        <TextInput
          label="Ширина"
          placeholder="100% или 200px"
          style={{ flex: 1 }}
          value={activeElement.style?.width || ''}
          onChange={(e) => handleStyleChange('width', e.target.value)}
        />
        <TextInput
          label="Высота"
          placeholder="auto или 100px"
          style={{ flex: 1 }}
          value={activeElement.style?.height || ''}
          onChange={(e) => handleStyleChange('height', e.target.value)}
        />
      </Flex>

      <NumberInput
        label="Скругление углов (px)"
        min={0}
        value={parseInt(activeElement.style?.borderRadius as string) || 0}
        onChange={(v) => handleStyleChange('borderRadius', `${v}px`)}
      />

      <Divider label="Цвета и Фон" labelPosition="center" />
      <ColorInput
        label="Цвет фона"
        value={activeElement.style?.backgroundColor as string || '#ffffff'}
        onChange={(v) => handleStyleChange('backgroundColor', v)}
      />
      <ColorInput
        label="Цвет текста / контента"
        value={activeElement.style?.color as string || '#000000'}
        onChange={(v) => handleStyleChange('color', v)}
      />

      <Divider label="Типографика" labelPosition="center" />
      <Flex gap="xs">
        <NumberInput
          label="Шрифт (px)"
          style={{ flex: 1 }}
          value={parseInt(activeElement.style?.fontSize as string) || 16}
          onChange={(v) => handleStyleChange('fontSize', `${v}px`)}
        />
        <Select
          label="Выравнивание"
          style={{ flex: 1 }}
          data={['left', 'center', 'right', 'justify']}
          value={activeElement.style?.textAlign as string || 'left'}
          onChange={(v) => handleStyleChange('textAlign', v)}
        />
      </Flex>

      <Divider label="Отступы" labelPosition="center" />
      <TextInput
        label="Padding (внутренние)"
        placeholder="10px 20px"
        value={activeElement.style?.padding || ''}
        onChange={(e) => handleStyleChange('padding', e.target.value)}
      />

      <Divider label="Выравнивание в контейнере" labelPosition="center" />
      <Flex gap="xs">
        <Button
          variant="outline"
          style={{ flex: 1 }}
          onClick={() => handleStyleChange('margin', '0 auto 0 0')}
        >
          Слева
        </Button>
        <Button
          variant="outline"
          style={{ flex: 1 }}
          onClick={() => handleStyleChange('margin', '0 auto')}
        >
          Центр
        </Button>
        <Button
          variant="outline"
          style={{ flex: 1 }}
          onClick={() => handleStyleChange('margin', '0 0 0 auto')}
        >
          Справа
        </Button>
      </Flex>
    </Stack>
  );
};