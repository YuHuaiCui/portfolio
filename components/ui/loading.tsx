import { Loader2 } from "lucide-react"

export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-royal-500" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  )
}
