import { useEffect, useRef, useState } from 'react'

/**
 * React hook that opens and manages a new browser window
 *
 * @param url      Destination URL for the new window
 * @param features Optional `window.open` feature string (e.g. "width=400,height=300")
 * @param name     Optional window name; using the same name re‑uses the window; defaults to "_blank"
 *
 * @returns An object with:
 *   - `isOpen` — `true` while the window exists
 *   - `open()` — programmatically open (or re‑focus) the window
 *   - `close()` — programmatically close the window
 *
 * The hook also detects when the user manually closes the window and cleans up
 * on component unmount
 */
export function useNewWindow(url: string, features = '', name = '_blank') {
  const handle = useRef<Window | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  /** Open the window or re‑open it if it was previously closed */
  const open = () => {
    if (!handle.current || handle.current.closed) {
      handle.current = window.open(url, name, features)
      setIsOpen(true)
    }
  }

  /** Close the window programmatically */
  const close = () => {
    handle.current?.close()
    handle.current = null
    setIsOpen(false)
  }

  // Poll for a user‑initiated close
  useEffect(() => {
    if (!isOpen) return
    const id = setInterval(() => {
      if (handle.current?.closed) close()
    }, 400)

    return () => clearInterval(id)
  }, [isOpen])

  // Ensure the popup is closed if the component unmounts
  useEffect(() => close, [])

  return { isOpen, open, close }
}
