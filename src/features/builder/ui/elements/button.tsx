import { Button } from "@mantine/core";

export const ButtonElement = ({ id, style, props }: any) => (
  <Button 
    id={id} 
    style={style} 
    variant={props?.variant || "filled"}
    styles={{
      root: {
        borderRadius: style.borderRadius, 
        backgroundColor: style.backgroundColor,
        color: style.color
      }
    }}
  >
    {props?.label}
  </Button>
);