
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"


export function PropertyTypeButton({
  active,
  children,
  className,
  ...props
}) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      className={cn(
        "h-auto min-w-[120px] flex-1 whitespace-nowrap px-4 py-2 text-sm",
        active && "bg-primary text-primary-foreground",
        !active && "bg-white text-muted-foreground border-muted",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

