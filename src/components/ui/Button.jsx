const variants = {
  // Road-sign yellow with a hard shadow that "presses" on click
  primary: 'bg-signal text-ink border-ink shadow-hard-sm hover:shadow-hard active:shadow-none active:translate-x-[3px] active:translate-y-[3px]',
  dark: 'bg-ink text-paper border-ink shadow-[3px_3px_0_0_#ffc21a] hover:shadow-[6px_6px_0_0_#ffc21a] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]',
  green: 'bg-route text-white border-ink shadow-hard-sm hover:shadow-hard active:shadow-none',
  outline: 'bg-transparent text-ink border-ink hover:bg-ink hover:text-paper',
  ghost: 'bg-transparent text-paper border-paper/40 hover:border-signal hover:text-signal',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3.5 text-base',
}

/**
 * Reusable button. Renders an <a> when `href` is passed, otherwise a <button>.
 */
export default function Button({
  as,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconLeft: IconLeft,
  className = '',
  children,
  ...props
}) {
  const Tag = as || (href ? 'a' : 'button')
  return (
    <Tag
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-md border-2 font-mono font-bold tracking-wider whitespace-nowrap uppercase transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft className="size-4" aria-hidden="true" />}
      {children}
      {Icon && <Icon className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />}
    </Tag>
  )
}
