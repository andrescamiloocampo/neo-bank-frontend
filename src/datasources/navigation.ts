import { type IconType } from "react-icons";
import { LuSquareArrowUpRight,LuSquareArrowDownLeft  } from "react-icons/lu";
import { PiCreditCardLight } from "react-icons/pi";
import { GoShieldCheck } from "react-icons/go";

interface NavigationM {
    text: string;
    href: string;
    icon?: IconType;
    body?: string;
}


export const navigationItems:NavigationM[] = [
    {
        text: 'Home',
        href: '/dashboard',        
    },
    {
        text: 'Pockets',
        href: '/dashboard/pockets'
    },
    {
        text: 'Transactions',
        href: '/dashboard/transactions'
    },
    {
        text: 'Notifications',
        href: '/dashboard/alerts'
    },
    {
        text: 'Settings',
        href: '/dashboard/settings'
    },
]

export const shortCuts:NavigationM[] = [
    {
        text:'Transfer',
        href:'/dashboard/transfer',
        icon: LuSquareArrowUpRight,
        body: 'Send money to friends and family'
    },
    {
        text:'Save',
        href:'/dashboard/pockets',
        icon: LuSquareArrowDownLeft ,
        body: 'Set up automatic savings rules'
    },
    {
        text:'Pay',
        href:'/dashboard/receipts',
        icon: PiCreditCardLight,
        body: 'Pay bills and merchants'
    },
    {
        text:'Security',
        href:'/dashboard/settings/security',
        icon: GoShieldCheck,
        body: 'Secure your account'
    },
]