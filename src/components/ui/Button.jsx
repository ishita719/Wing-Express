const variants = {
  primary:
    'bg-ember-500 text-white shadow-lg shadow-ember-500/30 hover:bg-ember-600 hover:shadow-ember-500/40',
  secondary: 'bg-wing-600 text-white shadow-lg shadow-wing-600/25 hover:bg-wing-700',
  ghost: 'border border-white/20 bg-white/5 text-white backdrop-blur hover:bg-white/10 hover:border-white/40',
  outline: 'border border-ink-900/15 bg-white text-ink-900 hover:border-ink-900/40',
  dark: 'bg-ink-900 text-white hover:bg-ink-800',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-7 py-4 text-base',
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
      className={`group inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft className="size-4" aria-hidden="true" />}
      {children}
      {Icon && <Icon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
    </Tag>
  )
}
