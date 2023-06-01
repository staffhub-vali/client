import React, { forwardRef, HTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/helpers'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {}

const headingVariants = cva(
	'text-slate-800 dark:text-slate-200 text-center lg:text-left font-extrabold leading-tight tracking-tight',
	{
		variants: {
			size: {
				default: 'text-4xl md:text-5xl lg:text-6xl ',
				lg: 'text-5xl md:text-6xl lg:text-7xl',
				sm: 'text-2xl md:text-3xl lg:text-4xl',
			},
		},
		defaultVariants: { size: 'default' },
	},
)

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
	({ className, size, children, ...props }, ref) => {
		return (
			<p
				ref={ref}
				{...props}
				className={cn(headingVariants({ size, className }))}>
				{children}
			</p>
		)
	},
)

Heading.displayName = 'Heading'

export default Heading