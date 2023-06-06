import React, { forwardRef, HTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/TailwindMerge'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {}

const headingVariants = cva('text-slate-800 dark:text-slate-200 font-bold leading-tight tracking-tight', {
	variants: {
		size: {
			default: 'text-4xl md:text-5xl lg:text-6xl ',
			lg: 'text-5xl md:text-6xl lg:text-7xl',
			sm: 'text-2xl md:text-3xl lg:text-4xl',
			xs: 'text-xl md:text-2xl lg:text-3xl',
		},
	},
	defaultVariants: { size: 'default' },
})

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(({ className, size, children, ...props }, ref) => {
	return (
		<p
			ref={ref}
			{...props}
			className={cn(headingVariants({ size, className }))}>
			{children}
		</p>
	)
})

Heading.displayName = 'Heading'

export default Heading
