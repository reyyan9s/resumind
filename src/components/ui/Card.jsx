import { forwardRef } from "react"
import { cn } from "../../lib/utils"
import { motion } from "framer-motion"

const Card = forwardRef(({ className, children, hoverEffect = false, ...props }, ref) => {
    const Comp = hoverEffect ? motion.div : "div"
    const hoverProps = hoverEffect ? {
        whileHover: { y: -4, scale: 1.01 },
        transition: { type: "spring", stiffness: 300, damping: 20 }
    } : {}

    return (
        <Comp
            ref={ref}
            className={cn(
                "rounded-2xl border border-border-light bg-white/50 backdrop-blur-xl text-text-light shadow-sm dark:border-border-dark dark:bg-[#1A1C24]/50 dark:text-text-dark relative overflow-hidden transition-colors",
                hoverEffect && "hover:shadow-md hover:border-primary/30 dark:hover:border-primary/50",
                className
            )}
            {...hoverProps}
            {...props}
        >
            {/* Subtle top glow effect in dark mode */}
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10" />
            {children}
        </Comp>
    )
})
Card.displayName = "Card"

const CardHeader = forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = forwardRef(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("font-semibold leading-none tracking-tight", className)}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = forwardRef(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-text-light-muted dark:text-text-dark-muted", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0 gap-3", className)}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
