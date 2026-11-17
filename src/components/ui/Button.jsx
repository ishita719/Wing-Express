const variants = {
  primary: 'bg-brand text-white shadow-sm shadow-brand/20 hover:bg-brand-dark hover:shadow-md hover:shadow-brand/25',
  accent: 'bg-accent text-white shadow-sm hover:brightness-95',
  white: 'bg-white text-ink shadow-sm hover:bg-brand-50',
  outline: 'border border-line bg-white text-ink hover:border-brand hover:text-brand',
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
  return (
    <Tag
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 disabled:pointer-events-none disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft className="size-4" aria-hidden="true" />}
      {children}
      {Icon && <Icon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />}
    </Tag>
  )
}
