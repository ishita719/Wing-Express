import { ArrowUp } from 'lucide-react'
import useScrolled from '../../hooks/useScrolled'

export default function BackToTop() {
  const show = useScrolled(700)
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed right-4 bottom-4 z-40 grid size-11 place-items-center rounded-full bg-charcoal text-white shadow-lg transition-all duration-300 hover:bg-crimson sm:right-6 sm:bottom-6 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  )
}
