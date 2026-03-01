import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

const variantStyles = {
    primary: "bg-[#7C7CFF] text-white hover:bg-[#6a6ae8] shadow-sm",
    secondary: "bg-[#E6E8FF] text-[#7C7CFF] hover:bg-[#d5d8ff] dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
    outline: "border border-gray-200 hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5 text-gray-800 dark:text-white bg-transparent",
    ghost: "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-800 dark:text-white bg-transparent",
}

const sizeStyles = {
    sm: "h-9 px-3 text-sm",
    default: "h-11 px-4 py-2",
    lg: "h-12 px-8 text-base font-medium",
    icon: "h-11 w-11",
}

const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C7CFF] disabled:pointer-events-none disabled:opacity-50 cursor-pointer"

// Regular button (renders as <button>)
const Button = forwardRef(({
    className,
    variant = 'primary',
    size = 'default',
    ...props
}, ref) => {
    return (
        <motion.button
            ref={ref}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
            {...props}
        />
    )
})
Button.displayName = "Button"

// LinkButton — renders as an <a> tag or wraps a <Link>. Use this instead of Button asChild.
const buttonClasses = (variant = 'primary', size = 'default', className) =>
    cn(baseStyles, variantStyles[variant], sizeStyles[size], className)

export { Button, buttonClasses }
