import { Box } from "@mantine/core";
import { type ReactNode } from "react";
import { type SectionElement as ISection } from "../../types/builder-types";

interface SectionProps extends Omit<ISection, 'children'> {
  children?: ReactNode;
}

export const SectionElement = ({ id, style, children }: SectionProps) => {
  return (
    <Box
      component="section"
      id={id}
      style={{
        ...style,
        width: '100%',
        minHeight: style.minHeight || '100px'
      }}
    >
      {children}
    </Box>
  );
};