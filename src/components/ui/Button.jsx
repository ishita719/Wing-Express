const variants = {
  // Crimson (brand) with a light "shine" sweep on hover
  primary: 'bg-crimson text-white shadow-sm shadow-crimson/30 hover:bg-crimson-dark hover:shadow-lg hover:shadow-crimson/30',
  charcoal: 'bg-charcoal text-white hover:bg-charcoal-2 hover:shadow-lg hover:shadow-charcoal/20',
  white: 'bg-white text-charcoal shadow-sm hover:bg-crimson-50',
  outline: 'border border-line bg-white text-ink hover:border-charcoal hover:text-charcoal',
  ghost: 'border border-white/25 text-white hover:bg-white/10 hover:border-white/40',
}

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
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
  const shine = variant === 'primary' || variant === 'charcoal'
  return (
    <Tag
      href={href}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg font-semibold whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {shine && (
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] bg-white/35 group-hover:animate-shine"
          aria-hidden="true"
        />
      )}
      {IconLeft && <IconLeft className="relative size-4" aria-hidden="true" />}
      <span className="relative">{children}</span>
      {Icon && <Icon className="relative size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />}
    </Tag>
  )
}
