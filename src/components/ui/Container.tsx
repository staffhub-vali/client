import React, { forwardRef, HTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/TailwindMerge'

interface ContainerProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {}

const containerVariants = cva('p-24 mx-auto flex flex-col items-center text-slate-800 dark:text-slate-200', {
	variants: {
		size: {
			default: 'w-1/2',
			lg: 'w-full',
			sm: 'w-1/3',
		},
	},
	defaultVariants: { size: 'default' },
})

const Container = forwardRef<HTMLDivElement, ContainerProps>(({ className, size, children, ...props }, ref) => {
	return (
		<div
			ref={ref}
			{...props}
			className={cn(containerVariants({ size, className }))}>
			{children}
		</div>
	)
})

Container.displayName = 'Container'

export default Container
