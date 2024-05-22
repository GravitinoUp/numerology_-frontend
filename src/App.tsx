import { Suspense, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Layout } from './components/layout/layout'
import { PageLoader } from './components/loaders/page-loader'
import { routes } from './constants/routes'
import AuthPage from './pages/auth'
import CategoriesPage from './pages/main/categoires'
import FormulasPage from './pages/main/formulas'
import NumbersPage from './pages/main/numbers'
import SectionsPage from './pages/main/sections'
import { useRefreshTokenMutation } from './redux/api/auth'
import { getJWTtokens, setCookieValue } from './utils/cookie'

function App() {
    const navigate = useNavigate()

    const [fetchRefresh, { data: newAccessToken, error, isSuccess }] =
        useRefreshTokenMutation()

    useEffect(() => {
        const { accessToken, refreshToken } = getJWTtokens()

        if (refreshToken) {
            fetchRefresh({ refresh_token: `${refreshToken}` })
        } else if (!accessToken) {
            navigate(routes.AUTH_PAGE)
        }
    }, [])

    useEffect(() => {
        if (isSuccess) {
            setCookieValue('accessToken', newAccessToken)
            navigate(routes.CATEGORIES)
        }
    }, [isSuccess])

    useEffect(() => {
        if (error) {
            navigate(routes.AUTH_PAGE)
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
                </Route>
                <Route path={routes.AUTH_PAGE} element={<AuthPage />} />
            </Routes>
        </Suspense>
    )
}

export default App
