import type { BuilderElement } from "../types/builder-types";
import { useBuilderStore } from "../model/use-builder-stoe";
import { COMPONENT_MAP } from "./elements";
import { ActionIcon, Box } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

export const RenderElement = ({ element }: { element: BuilderElement }) => {
  const activeId = useBuilderStore(state => state.activeElementId);
  const selectElement = useBuilderStore(state => state.selectElement);
  const removeElement = useBuilderStore(state => state.removeElement);

  const isSelected = activeId === element.id;
  const Component = COMPONENT_MAP[element.type];

  if (!Component) return null;

  const renderedChildren = ('children' in element && element.children) 
    ? element.children.map((child) => (
        <RenderElement key={child.id} element={child} />
      ))
    : null;

  return (
    <Box
      onClick={(e) => {
        e.stopPropagation();
        selectElement(element.id);
      }}
      style={{
        outline: isSelected ? '2px solid gray' : 'none',
        outlineOffset: '2px',
        cursor: 'pointer',
        position: 'relative',
        transition: 'outline 0.2s ease',
      }}
    >
      {isSelected && (
        <ActionIcon
          color="gray"
          variant="filled"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            removeElement(element.id);
          }}
          style={{
            position: 'absolute',
            right: 0,
            top: -10,
            zIndex: 111,
            borderRadius: '50%'
          }}
        >
          <IconTrash size={14} />
        </ActionIcon>
      )}

      <Component 
        id={element.id} 
        style={element.style} 
        props={(element as any).props}
      >
        {renderedChildren}
      </Component>
    </Box>
  );
};