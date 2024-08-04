import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, Mail, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { registerAccountDefaultValues, RegisterAccountSchema, registerAccountSchema } from "../../validation/schemas"
import Button from "../../components/Button"
import { Link, useNavigate } from "react-router-dom"
import { useRegister } from "../../hooks/api/auth"

const RegisterPage = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterAccountSchema>({
    defaultValues: registerAccountDefaultValues,
    resolver: zodResolver(registerAccountSchema),
  })

  const { mutateAsync, isPending } = useRegister()

  async function onSubmit(data: RegisterAccountSchema) {
    await mutateAsync(data)
    navigate("/")
  }

  return (
    <div className="flex h-screen items-center justify-center bg-pattern bg-center bg-no-repeat">
      <div className="w-full max-w-3xl space-y-10 px-6 text-center">
        <img src="/logo.svg" alt="Plann.er" className="mx-auto" />
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-[640px] space-y-3 rounded-xl bg-lime-400/90 px-6 py-5 shadow-shape">
          <p className="text-2xl text-zinc-800 font-semibold">Crie sua conta</p>

          <div className="flex h-14 items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5">
            <User className="size-5 text-zinc-400" />

            <input className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none" placeholder="Seu nome" {...register("name")} />
          </div>

          <div className="flex h-14 items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5">
            <Mail className="size-5 text-zinc-400" />

            <input className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none" placeholder="E-mail" {...register("email")} />
          </div>

          <div className="flex h-14 items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5">
            <Lock className="size-5 text-zinc-400" />

            <input className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none" placeholder="Senha" {...register("password")} />
          </div>

          <div>
            {Object.entries(errors).map(([field, error]) => (
              <p key={field} className="text-xs text-red-400">
                {error?.message}
              </p>
            ))}
          </div>

          <Button type="submit" variant="secondary" size="full" isLoading={isPending}>
            Criar conta
          </Button>

          <div className="text-zinc-900">
            <span>Já tem contra?</span>
            <Link to="/auth/login" className="mx-2 underline decoration-lime-300 decoration-4">
              Entrar
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
