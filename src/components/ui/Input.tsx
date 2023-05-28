import { cn } from '../../utils/helpers'
import { cva, VariantProps } from 'class-variance-authority'
import { InputHTMLAttributes, FC, forwardRef, ChangeEvent } from 'react'

export const inputVariants = cva('rounded font-medium focus:outline-none shadow w-full', {
	variants: {
		variant: {
			default:
				'bg-white text-slate-800 dark:bg-slate-700 dark:text-slate-200 focus:ring-2 ring-slate-800 dark:ring-slate-200',
		},
		size: {
			default: 'p-2 text-md',
			sm: 'px-2 py-1 text-sm',
			lg: 'px-4 py-3 text-lg',
		},
	},

	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
})

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
	size?: any
	id: string
	name: string
	type: string
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
	({ className, variant, size, value, type, id, name, onChange }, ref) => {
		return (
			<input
				id={id}
				ref={ref}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				className={cn(inputVariants({ variant, size, className }))}
			/>
		)
	},
)

Input.displayName = 'Input'

export default Input
