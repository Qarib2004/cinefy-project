import { useState } from "react"

export function useSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const open = () => setIsCollapsed(false)
  const close = () => setIsCollapsed(true)

  return {
    isCollapsed,
    open,
    close,
  }
}
