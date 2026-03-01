import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

export const GridBackground = ({ className, mask = true }) => (
    <div className={cn("absolute inset-0 bg-grid pointer-events-none opacity-[0.4] dark:opacity-[0.2]", mask && "mask-fade-out", className)} />
)

export const DotBackground = ({ className, mask = true }) => (
    <div className={cn("absolute inset-0 bg-dots pointer-events-none opacity-[0.5] dark:opacity-[0.3]", mask && "mask-fade-out", className)} />
)

export const AmbientOrb = ({ className, color = "rgba(124, 124, 255, 0.15)", size = "400px", delay = 0 }) => (
    <motion.div
        animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 20, 0],
            y: [0, -20, 0],
        }}
        transition={{
            duration: 10,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
        className={cn("absolute rounded-full blur-[100px] pointer-events-none z-0", className)}
        style={{
            backgroundColor: color,
            width: size,
            height: size,
        }}
    />
)

export const FloatingElement = ({ children, className, delay = 0, duration = 8 }) => (
    <motion.div
        animate={{
            y: [0, -15, 0],
            rotate: [0, 2, 0],
        }}
        transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
        className={className}
    >
        {children}
    </motion.div>
)

export const GlassPanel = ({ children, className, intensity = "medium", style, ...props }) => {
    const blurMap = {
        low: "blur(12px)",
        medium: "blur(24px)",
        high: "blur(40px)"
    }

    return (
        <div className={cn(
            "rounded-3xl border transition-all duration-500",
            "bg-white/5 dark:bg-black/20 border-white/10 dark:border-white/5",
            "shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.4)]",
            className
        )} style={{ backdropFilter: blurMap[intensity], ...style }} {...props}>
            {children}
        </div>
    )
}
