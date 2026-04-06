import { Image } from "@mantine/core";
export const ImageElement = ({ id, style, props }: any) => (
  <Image id={id} src={props?.src} alt={props?.alt} style={{ ...style, objectFit: 'cover' }} />
);