import { cn } from '../../utils/TailwindMerge.ts'
import React, { forwardRef, HTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraphVariants> {}

const paragraphVariants = cva('text-slate-800 max-w-prose dark:text-slate-200 text-center', {
	variants: {
		size: {
			default: 'sm:text-lg text-md',
			sm: 'sm:text-sm text-xs',
			lg: 'sm:text-xl text-lg',
			xl: 'sm:text-2xl text-xl',
		},
	},
	defaultVariants: { size: 'default' },
})

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(({ className, size, children, ...props }, ref) => {
	return (
		<p
			ref={ref}
			{...props}
			className={cn(paragraphVariants({ size, className }))}>
			{children}
		</p>
	)
})

Paragraph.displayName = 'Paragraph'

export default Paragraph
