import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { routes } from './constants/routes'
import AuthPage from './pages/auth'

function App() {
    const navigate = useNavigate()
    const path = useLocation()

    useEffect(() => {
        if (path.pathname === '/') {
            navigate(routes.AUTH_PAGE)
        }
    }, [])

    return (
        <Routes>
            <Route path={routes.AUTH_PAGE} element={<AuthPage />} />
        </Routes>
    )
}

export default App
