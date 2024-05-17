import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import Logo from '@/assets/icons/logo.svg'
import CustomForm, { useForm } from '@/components/form/form'
import { InputField } from '@/components/input-field/input-field'
import Button from '@/components/ui/button'
import { FormField } from '@/components/ui/form'

const authSchema = z.object({
    email: z.string().email(i18next.t('error.email.format')),
    password: z.string().min(1, i18next.t('error.required')),
    remember_me: z.boolean(),
})

export default function AuthPage() {
    const { t } = useTranslation()

    const form = useForm({
        schema: authSchema,
        defaultValues: { email: '', password: '', remember_me: false },
    })

    const onSubmit = () => {}

    return (
        <div className="flex w-screen h-screen items-center mobile:justify-center select-none">
            <div className="absolute w-screen h-screen z-[-1] ">
                <div className="absolute w-full h-full bg-black/50" />
                <img
                    src="src/assets/images/login.png"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col w-[500px] md:mx-32 mobile:mx-8 p-8 py-14 items-center bg-white shadow-lg rounded-xl ">
                <Logo />
                <h1 className="text-3xl font-bold">{t('sign.in.title')}</h1>
                <p className="w-[240px] mb-8 text-center">
                    {t('sign.in.description')}
                </p>
                <CustomForm className="w-full" form={form} onSubmit={onSubmit}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <InputField
                                label="Email"
                                className="mt-8"
                                inputClassName="h-14"
                                {...field}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <InputField
                                label={t('password')}
                                className="mt-8"
                                inputClassName="h-14"
                                {...field}
                            />
                        )}
                    />
                    <Button size="lg" className="w-full mt-8">
                        {t('action.sign.in')}
                    </Button>
                </CustomForm>
            </div>
        </div>
    )
}
