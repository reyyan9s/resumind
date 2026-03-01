import { cn } from "../../lib/utils"

export function Section({ className, children, ...props }) {
    return (
        <section
            className={cn(
                "py-12 md:py-20 lg:py-24",
                className
            )}
            {...props}
        >
            {children}
        </section>
    )
}
