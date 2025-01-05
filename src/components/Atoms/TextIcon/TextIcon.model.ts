import { type IconType } from "react-icons";

export interface TextIconModel {
    Icon?: IconType;
    text: string;
    href: string;
    path?: string;
}