import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import { DrawerItemType } from "../Models/DrawerItem";

export const DrawerItems: DrawerItemType[] = [
    { name: "Home", url: "/", Icon: HomeIcon },
    { name: "Nalozi", url: "/Orders", Icon: ArticleIcon },
]