import { Suspense, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Layout } from './components/layout/layout'
import { PageLoader } from './components/loaders/page-loader'
import { routes } from './constants/routes'
import AuthPage from './pages/auth'
import CategoriesPage from './pages/main/categoires'
import FormulasPage from './pages/main/formulas'
import NumbersPage from './pages/main/numbers'
import SectionsPage from './pages/main/sections'
import SettingsPage from './pages/settings'
import DeactivatePage from './pages/settings/deactivate'
import DeactivateInfoPage from './pages/settings/deactivate-info'
import UsersPage from './pages/users'
import { useRefreshTokenMutation } from './redux/api/auth'
import { getJWTtokens, setCookieValue } from './utils/cookie'

function App() {
    const navigate = useNavigate()
    const path = useLocation()

    const [fetchRefresh, { data: newAccessToken, error, isSuccess }] =
        useRefreshTokenMutation()

    useEffect(() => {
        const { accessToken, refreshToken } = getJWTtokens()

        if (refreshToken) {
            fetchRefresh({ refresh_token: `${refreshToken}` })
        } else if (!accessToken) {
            if (path.pathname !== routes.DEACTIVATE_INFO) {
                navigate(routes.AUTH_PAGE)
            }
        }
    }, [])

    useEffect(() => {
        if (isSuccess) {
            setCookieValue('accessToken', newAccessToken, '43200')

            if (path.pathname === routes.AUTH_PAGE || path.pathname === '/') {
                navigate(routes.CATEGORIES)
            }
        }
    }, [isSuccess])

    useEffect(() => {
        if (error) {
            if (path.pathname !== routes.DEACTIVATE_INFO) {
                navigate(routes.AUTH_PAGE)
            }
        }
    }, [error])

    return (
        <Suspense fallback={<PageLoader className="h-[100vh]" />}>
            <Routes>
                <Route path={routes.MAIN_PAGE} element={<Layout />}>
                    <Route
                        path={routes.CATEGORIES}
                        element={<CategoriesPage />}
                    />
                    <Route path={routes.SECTIONS} element={<SectionsPage />} />
                    <Route path={routes.FORMULAS} element={<FormulasPage />} />
                    <Route path={routes.NUMBERS} element={<NumbersPage />} />
                    <Route path={routes.USERS} element={<UsersPage />} />
                    <Route path={routes.SETTINGS} element={<SettingsPage />} />
                </Route>
                <Route path={routes.AUTH_PAGE} element={<AuthPage />} />
                <Route path={routes.DEACTIVATE} element={<DeactivatePage />} />
                <Route
                    path={routes.DEACTIVATE_INFO}
                    element={<DeactivateInfoPage />}
                />
            </Routes>
        </Suspense>
    )
}

export default App
