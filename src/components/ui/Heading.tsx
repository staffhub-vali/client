import React, { forwardRef, HTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/TailwindMerge.ts'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {}

const headingVariants = cva('text-slate-800 dark:text-slate-200 font-bold leading-tight tracking-tight', {
	variants: {
		size: {
			default: 'sm:text-5xl text-3xl',
			sm: 'text-2xl md:text-3xl lg:text-4xl',
			xs: 'text-lg md:text-2xl lg:text-3xl',
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
