import { FC } from 'react'
import { clsx } from 'clsx'

interface LabelProps {
	htmlFor?: string
	children: string
	className?: string
}

const Label: FC<LabelProps> = ({ htmlFor, className, children }) => {
	return (
		<label
			className={clsx('text-md mb-2 block font-medium text-slate-800 dark:text-slate-200', className)}
			htmlFor={htmlFor}>
			{children}
		</label>
	)
}

export default Label
