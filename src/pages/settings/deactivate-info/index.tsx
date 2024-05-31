import { useTranslation } from 'react-i18next'
import Logo from '@/assets/icons/logo.svg'

export default function DeactivateInfoPage() {
    const { t } = useTranslation()

    return (
        <div className="flex w-screen h-screen items-center mobile:justify-center select-none">
            <div className="absolute w-screen h-screen z-[-1] ">
                <div className="absolute w-full h-full bg-black/50" />
                <img
                    src="src/assets/images/login.png"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col w-[500px] md:mx-32 mobile:mx-8 p-8 py-14 justify-center items-center bg-white shadow-lg rounded-xl ">
                <Logo />
                <h1 className="mt-4 text-3xl font-bold text-center">
                    {t('deactivate.title')}
                </h1>
                <p className="mt-4 w-[300px] mb-8 text-center">
                    {t('deactivate.info.description')}
                </p>
                <ul className="list-decimal">
                    <li>Войти в аккаунт</li>
                    <li>Перейти на вкладку Настройки</li>
                    <li>
                        Нажать кнопку Деактивировать аккаунт в поле Деактивация
                        аккаунта
                    </li>
                    <li>Следовать дальнейшей инструкции на экране</li>
                </ul>
            </div>
        </div>
    )
}
