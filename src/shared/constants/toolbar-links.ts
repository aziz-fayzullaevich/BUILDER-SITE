import {
    IconBorderBottom,
    IconCodeVariableMinus,
    IconListDetails,
    IconPolaroid,
    IconSection,
    IconTextRecognition
} from '@tabler/icons-react';

import { SectionElement } from '../../features/builder/ui/elements/section';
import { BoxElement } from '../../features/builder/ui/elements/box';
import { TextElement } from '../../features/builder/ui/elements/text';
import { ImageElement } from '../../features/builder/ui/elements/image';
import { ButtonElement } from '../../features/builder/ui/elements/button';
import { FormElement } from '../../features/builder/ui/elements/form';

export const TOOLBAR_LISTS = [
    { label: 'Section', icon: IconSection, component: SectionElement },
    { label: 'Box', icon: IconBorderBottom, component: BoxElement },
    { label: 'Text', icon: IconTextRecognition, component: TextElement },
    { label: 'Image', icon: IconPolaroid, component: ImageElement },
    { label: 'Button', icon: IconCodeVariableMinus, component: ButtonElement },
    { label: 'Form', icon: IconListDetails, component: FormElement },
];