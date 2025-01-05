import { type IconType } from "react-icons";

export interface ClickableTabModel  {
    text: string;
    href: string;
    Icon?: IconType;
    body?: string;
}