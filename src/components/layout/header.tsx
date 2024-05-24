import { useLocation, useNavigate } from 'react-router-dom'
import UserPhoto from '@/assets/images/user.png'
import { routes } from '@/constants/routes'
import { useGetCurrentUserQuery } from '@/redux/api/users'

export function Header() {
    const navigate = useNavigate()
    const path = useLocation()

    const {
        data: user,
        isFetching: userFetching,
        isSuccess: userSuccess,
    } = useGetCurrentUserQuery()

    const successLoad = !userFetching && userSuccess

    return (
        <header className="absolute top top-4 right-9">
            {successLoad && (
                <div
                    className="flex bg-white rounded-xl px-4 py-3 items-center border cursor-pointer"
                    onClick={() =>
                        path.pathname !== routes.SETTINGS &&
                        navigate(routes.SETTINGS)
                    }
                >
                    <img src={UserPhoto} className="w-9 h-9 mr-6" />
                    <div>
                        <p className="font-semibold leading-5">{`${user?.person.last_name} ${user?.person.first_name}`}</p>
                        <p className="text-sm text-black/50 leading-4">
                            {user?.role.role_name}
                        </p>
                    </div>
                </div>
            )}
        </header>
    )
}
