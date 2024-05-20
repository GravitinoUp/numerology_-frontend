import { NavLink, useLocation } from 'react-router-dom'
import Button from '../ui/button'
import { cn } from '@/lib/utils'

type NavbarLinkProps = {
    path: string
    title: string
    children: React.ReactNode
}

const NavbarLink = ({ path, title, children }: NavbarLinkProps) => {
    const { pathname } = useLocation()
    const isOnCurrentPath = path === pathname

    if (isOnCurrentPath) {
        document.title = title
    }

    return (
        <NavLink
            to={path}
            className={({ isActive }) =>
                cn('flex bg-transparent', isActive && '')
            }
        >
            <Button
                className={cn(
                    'w-full h-[46px] justify-start bg-transparent rounded-xl',
                    isOnCurrentPath && 'bg-muted'
                )}
                variant="ghost"
            >
                <div className="flex items-center">
                    {children}
                    <div
                        className={cn(
                            isOnCurrentPath ? 'font-[600]' : 'font-[400]',
                            'ml-3 font-pop text-[16px] text-[#3F434A] text-start'
                        )}
                    >
                        {title}
                    </div>
                </div>
            </Button>
        </NavLink>
    )
}

export default NavbarLink
