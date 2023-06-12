import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/TailwindMerge'
import { ButtonHTMLAttributes, FC, forwardRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
	'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:ring-none active:ring-none disabled:pointer-events-none duration-150 transition-all ',
	{
		variants: {
			variant: {
				default:
					'bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-50',

				outline: 'bg-transparent border-2 border-slate-800 dark:border-slate-300 dark:text-slate-200',
				outlineHover:
					'bg-slate-800 text-white hover:bg-transparent dark:bg-slate-200 dark:text-slate-900  border hover:text-black border-slate-800 dark:hover:bg-transparent dark:border-slate-200 dark:hover:text-slate-200',

				link: 'bg-transparent dark:bg-transparent text-slate-900 dark:text-slate-100',
				danger: 'bg-red-400 hover:bg-rose-500 text-white',
				cancel: "bg-slate-400 text-white hover:bg-slate-400 dark:bg-slate-400 dark:text-white dark:hover:bg-slate-400'",
			},
			size: {
				default: 'h-10 py-2 px-4 min-w-[8rem]',
				sm: 'h-9 px-2 w-28 min-w-[6rem]',
				lg: 'h-11 px-8 text-2xl min-w-[10rem]',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	loading?: boolean
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, type, children, variant, loading, size, ...props }, ref) => {
		return (
			<button
				ref={ref}
				type={type}
				disabled={loading}
				className={cn(buttonVariants({ variant, size, className }))}
				{...props}>
				{loading ? <Loader2 className=' h-4 w-4 animate-spin' /> : children}
			</button>
		)
	},
)

Button.displayName = 'Button'

export default Button
