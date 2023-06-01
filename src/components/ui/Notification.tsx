import React, { forwardRef, HTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/helpers'

interface NotificationProps
	extends HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof notificationVariants> {}

const notificationVariants = cva('mx-auto w-fit rounded px-4 py-2 text-3xl text-white', {
	variants: {
		size: {
			default: 'text-lg',
			sm: 'text-sm',
			lg: 'text-2xl',
		},
		variant: { success: 'bg-green-500', error: 'bg-red-400' },
	},
	defaultVariants: { size: 'default', variant: 'success' },
})

const Notification = forwardRef<HTMLParagraphElement, NotificationProps>(
	({ className, size, variant, children, ...props }, ref) => {
		return (
			<p
				ref={ref}
				{...props}
				className={cn(notificationVariants({ size, variant, className }))}>
				{children}
			</p>
		)
	},
)

Notification.displayName = 'Notification'

export default Notification
