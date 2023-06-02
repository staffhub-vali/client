import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/helpers'
import { ButtonHTMLAttributes, FC, forwardRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
	'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none ',
	{
		variants: {
			variant: {
				default:
					'bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-50',

				outline:
					'bg-slate-800 text-white hover:bg-transparent dark:bg-slate-200 dark:text-slate-900  border hover:text-black border-slate-800 dark:hover:bg-transparent dark:border-slate-200 dark:hover:text-slate-200',

				link: 'bg-transparent dark:bg-transparent text-slate-900 dark:text-slate-100',
				danger: 'bg-red-400 hover:bg-rose-500 text-white',
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
	isLoading?: boolean
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, variant, isLoading, size, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				disabled={isLoading}
				{...props}>
				{isLoading ? <Loader2 className=' h-6 w-6 animate-spin' /> : children}
			</button>
		)
	},
)

Button.displayName = 'Button'

export default Button
