import React, { forwardRef, HTMLAttributes, useEffect, useState } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/TailwindMerge'

interface NotificationProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof notificationVariants> {}

const notificationVariants = cva('mx-auto fade fade-in w-fit rounded px-4 py-2 text-3xl text-white', {
	variants: {
		size: {
			default: 'text-lg',
			sm: 'text-sm',
			lg: 'text-2xl',
		},
		position: { top: 'top-28 absolute left-0 right-0 ', bottom: 'bottom-16 absolute left-0 right-0 ' },
		variant: { success: 'bg-green-500', error: 'bg-red-400' },
	},
	defaultVariants: { size: 'default', variant: 'success' },
})

const Notification = forwardRef<HTMLParagraphElement, NotificationProps>(
	({ className, size, variant, position, children, ...props }, ref) => {
		const [isVisible, setIsVisible] = useState(false)

		useEffect(() => {
			const timer = setTimeout(() => {
				setIsVisible(false)
			}, 5000)

			return () => clearTimeout(timer)
		}, [])

		useEffect(() => {
			const timer = setTimeout(() => {
				setIsVisible(true)
			}, 50)

			return () => clearTimeout(timer)
		}, [])
		return (
			<p
				ref={ref}
				{...props}
				className={cn(notificationVariants({ size, variant, position, className }), { 'opacity-0': !isVisible })}>
				{children}
			</p>
		)
	},
)

Notification.displayName = 'Notification'

export default Notification
