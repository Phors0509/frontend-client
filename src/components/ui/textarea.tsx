import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md bg-gray-100 dark:bg-gray-800 dark:border-none px-3 py-2 text-base placeholder:text-muted-foreground transition duration-200 focus-visible:outline-orange-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:placeholder-white border border-gray-300",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
