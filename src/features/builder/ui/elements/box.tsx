import { Box } from "@mantine/core";
import { type ReactNode } from "react";
import { type BoxElement as IBox } from "../../types/builder-types";

interface BoxProps extends Omit<IBox, 'children'> {
  children?: ReactNode;
}

export const BoxElement = ({ id, style, children }: BoxProps) => {
  return (
    <Box
      id={id}
      style={{
        ...style,
        display: style.display || 'flex',
        flexDirection: style.flexDirection || 'column',
        gap: style.gap || '10px'
      }}
    >
      {children}
    </Box>
  );
};