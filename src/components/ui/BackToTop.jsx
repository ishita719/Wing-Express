import { ArrowUp } from 'lucide-react'
import useScrolled from '../../hooks/useScrolled'

export default function BackToTop() {
  const show = useScrolled(700)
  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`fixed right-4 bottom-4 z-40 grid size-12 place-items-center rounded-md border-2 border-ink bg-signal text-ink shadow-hard-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-hard sm:right-6 sm:bottom-6 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp className="size-5" strokeWidth={2.5} aria-hidden="true" />
    </a>
  )
}
