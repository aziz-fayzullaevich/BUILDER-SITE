import type { CSSProperties } from "react";

export type ElementType = 'section' | 'box' | 'text' | 'image' | 'button' | 'form';

interface BaseElement {
    id: string;
    style: CSSProperties;
}

export interface SectionElement extends BaseElement {
    type: 'section';
    props: Record<string, never>;
    children: BuilderElement[];
}

export interface BoxElement extends BaseElement {
    type: 'box';
    props: Record<string, never>;
    children: BuilderElement[];
}

export interface TextElement extends BaseElement {
    type: 'text';
    props: { content: string };
}

export interface ImageElement extends BaseElement {
    type: 'image';
    props: { src: string; alt: string };
}

export interface ButtonElement extends BaseElement {
    type: 'button';
    props: { label: string; variant: string };
}

export interface FormElement extends BaseElement {
    type: 'form';
    props: { placeholder: string };
}

export type BuilderElement =
    | TextElement
    | ButtonElement
    | SectionElement
    | BoxElement
    | ImageElement
    | FormElement;