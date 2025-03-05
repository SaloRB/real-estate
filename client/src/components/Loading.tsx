import { Loader2Icon } from 'lucide-react'

const Loading = () => {
  return (
    <div className="fixed inset-0 flex gap-2 items-center justify-center bg-background/50 z-50">
      <Loader2Icon className="size-12 animate-spin text-primary-700" />
      <span className="text-sm font-medium text-primary-700">Loading...</span>
    </div>
  )
}
export default Loading
