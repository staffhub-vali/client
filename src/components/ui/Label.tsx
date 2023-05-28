import { FC } from 'react'
import { clsx } from 'clsx'

interface LabelProps {
	id: string
	children: string
	className?: string
}

const Label: FC<LabelProps> = ({ id, className, children }) => {
	return (
		<label
			className={clsx('mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200', className)}
			htmlFor={id}>
			{children}
		</label>
	)
}

export default Label
