import { ROUTES } from "./routes";
import { IconBoxMultiple, IconCopyPlus, IconHome, IconUser } from '@tabler/icons-react'

export const NAVBAR_LINKS = [
    { label: 'Главная', icon: IconHome, link: ROUTES.HOME },
    { label: 'Создать новый сайт', icon: IconCopyPlus, link: ROUTES.CREATE },
    { label: 'Мои сайты', icon: IconBoxMultiple, link: ROUTES.MY_SITES },
    { label: 'Профиль', icon: IconUser, link: ROUTES.PROFILE },
];