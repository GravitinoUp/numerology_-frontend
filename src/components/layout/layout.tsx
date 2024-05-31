import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { Navbar } from './navbar'
import { roles } from '@/constants'
import { useGetCurrentUserQuery } from '@/redux/api/users'

export function Layout({ children }: { children?: ReactNode }) {
    const {
        data: user,
        isFetching: userFetching,
        isSuccess: userSuccess,
    } = useGetCurrentUserQuery()

    const successLoad = !userFetching && userSuccess

    return (
        successLoad &&
        user.role.role_id === roles.admin && (
            <main
                className={
                    'min-h-screen grid grid-cols-[250px_auto] mobile:grid-cols-[88px_auto] bg-[#F8F8F8]'
                }
            >
                <div className="col-1">
                    <div className="sticky top-0">
                        <Navbar />
                    </div>
                </div>

                <div className="grid col-2">
                    <Header />
                    <div className="bg-[#F8F8F8] items-start flex place-items-start justify-start row-2 overflow-visible overflow-y-auto">
                        <Outlet />
                        {children}
                    </div>
                </div>
            </main>
        )
    )
}
