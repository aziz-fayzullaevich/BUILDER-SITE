import type { FC } from 'react';
import { ButtonElement } from './button';
import { SectionElement } from "./section";
import { BoxElement } from "./box";
import { TextElement } from "./text";
import { ImageElement } from "./image";
import { FormElement } from "./form";

export const COMPONENT_MAP: Record<string, FC<any>> = {
    section: SectionElement,
    box: BoxElement,
    text: TextElement,
    image: ImageElement,
    button: ButtonElement,
    form: FormElement
};