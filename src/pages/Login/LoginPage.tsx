import { useForm } from "react-hook-form"
import Button from "../../components/Button"
import { loginDefaultValues, LoginSchema, loginSchema } from "../../validation/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, Mail } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useLogin } from "../../hooks/api/auth"

const LoginPage = () => {
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchema>({
    defaultValues: loginDefaultValues,
    resolver: zodResolver(loginSchema),
  })

  const { mutateAsync, isPending } = useLogin()

  async function onSubmit(data: LoginSchema) {
    await mutateAsync(data)
    navigate("/")
  }

  return (
    <div className="flex h-screen items-center justify-center bg-pattern bg-center bg-no-repeat">
      <div className="w-full max-w-3xl space-y-10 px-6 text-center">
        <img src="/logo.svg" alt="Plann.er" className="mx-auto" />
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-[640px] space-y-3 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
          <p className="text-2xl font-semibold text-zinc-300">Entre na sua conta</p>

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

          <Button type="submit" size="full" isLoading={isPending}>
            Entrar
          </Button>

          <div>
            <span>Não tem conta?</span>
            <Link to="/auth/register" className="mx-2 underline decoration-lime-300 decoration-4">
              Criar conta
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
