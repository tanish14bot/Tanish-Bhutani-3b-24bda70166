import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type LibraryButtonProps = {
    onClick: () => void
    variant: "add" | "remove" | "edit"
    children: React.ReactNode
}

export function LibraryButton({ onClick, variant, children }: LibraryButtonProps) {
    const variantStyles = {
        add: "bg-blue-600 hover:bg-blue-700",
        remove: "bg-red-600 hover:bg-red-700",
        edit: "bg-amber-600 hover:bg-amber-700",
    }

    return (
        <Button
            onClick={onClick}
            className={cn("text-white", variantStyles[variant])}
        >
            {children}
        </Button>
    )
}
