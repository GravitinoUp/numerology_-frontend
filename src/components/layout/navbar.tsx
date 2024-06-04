import NavbarLink from './navbar-link'
import Watermark from '../watermark/watermark'
import DashboardIcon from '@/assets/icons/dashboard.svg'
import Logo from '@/assets/icons/logo.svg'
import SettingsIcon from '@/assets/icons/settings.svg'
import UsersIcon from '@/assets/icons/users.svg'
import { roles } from '@/constants'
import { routes } from '@/constants/routes'
import { useGetCurrentUserQuery } from '@/redux/api/users'

interface SingleLink {
    path: string
    title: string
    children: React.ReactNode
}

export function Navbar() {
    const {
        data: user,
        isFetching: userFetching,
        isSuccess: userSuccess,
    } = useGetCurrentUserQuery()

    const successLoad = !userFetching && userSuccess

    const links: (SingleLink | false)[] = [
        successLoad &&
            user.role.role_id === roles.admin && {
                path: routes.CATEGORIES,
                title: 'Категории',
                children: <DashboardIcon />,
            },
        successLoad &&
            user.role.role_id === roles.admin && {
                path: routes.USERS,
                title: 'Пользователи',
                children: <UsersIcon />,
            },
        {
            path: routes.SETTINGS,
            title: 'Настройки',
            children: <SettingsIcon />,
        },
    ]

    return (
        <nav className="bg-white flex flex-col items-center border-solid h-screen pt-3 shadow-xl">
            <Logo />
            <ul className="flex flex-col w-full h-full mt-20 px-4 gap-2">
                {links.map((item, key) => {
                    if (!item) {
                        return void 0
                    }

                    const link = item

                    return (
                        <li key={key}>
                            <NavbarLink path={link.path} title={link.title}>
                                {link.children}
                            </NavbarLink>
                        </li>
                    )
                })}
                <div className="flex-auto" />
                <div className="w-full my-6 text-center mobile:hidden">
                    <Watermark />
                </div>
            </ul>
        </nav>
    )
}
