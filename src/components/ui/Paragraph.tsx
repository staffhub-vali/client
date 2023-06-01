import React, { forwardRef, HTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/helpers'

interface ParagraphProps
	extends HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof paragraphVariants> {}

const paragraphVariants = cva('text-slate-800 max-w-prose dark:text-slate-200 mb-2 text-center', {
	variants: {
		size: {
			default: 'text-base sm:text-lg',
			sm: 'text-sm sm:text-base ',
		},
	},
	defaultVariants: { size: 'default' },
})

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
	({ className, size, children, ...props }, ref) => {
		return (
			<p
				ref={ref}
				{...props}
				className={cn(paragraphVariants({ size, className }))}>
				{children}
			</p>
		)
	},
)

Paragraph.displayName = 'Paragraph'

export default Paragraph