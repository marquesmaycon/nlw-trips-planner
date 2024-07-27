import { LoaderCircle } from "lucide-react"
import { ComponentProps, ReactNode } from "react"
import { tv, VariantProps } from "tailwind-variants"

const buttonVariants = tv({
  base: "rounded-lg px-5 py-2 font-medium flex items-center justify-center gap-2 transition-all ease-in duration-200",
  variants: {
    variant: {
      primary: "bg-lime-300 text-lime-950 hover:bg-lime-400",
      secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
    },
    size: {
      full: "w-full h-11",
    },
    isLoading: {
      true: "opacity-60 hover:bg-none cursor-not-allowed",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode
  }

const Button = ({ children, variant, size, isLoading, ...props }: ButtonProps) => {
  return (
    <button {...props} className={buttonVariants({ variant, size, isLoading })}>
     {isLoading &&  <LoaderCircle className="animate-spin" />} {children}
    </button>
  )
}

export default Button
