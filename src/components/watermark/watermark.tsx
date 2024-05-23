import { useTranslation } from 'react-i18next'

const Watermark = () => {
    const { t } = useTranslation()

    return (
        <a
            href="https://gravitino.ru/"
            className="w-full my-6 text-[#59656A] text-center"
        >
            {t('made.in')}
            <span className="font-bold"> {t('gravitino')}</span>
        </a>
    )
}

export default Watermark
