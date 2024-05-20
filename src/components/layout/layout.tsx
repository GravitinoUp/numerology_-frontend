import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { Navbar } from './navbar'

export function Layout({ children }: { children?: ReactNode }) {
    return (
        <main
            className={'min-h-screen grid grid-cols-[250px_auto] bg-[#F8F8F8]'}
        >
            <div className="col-1">
                <div className="sticky top-0">
                    <Navbar />
                </div>
            </div>

            <div>
                <Header />
                <div className="bg-[#F8F8F8] items-start flex place-items-start justify-start row-2 overflow-visible overflow-y-auto">
                    <Outlet />
                    {children}
                </div>
            </div>
        </main>
    )
}
