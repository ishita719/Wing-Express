import useInView from '../../hooks/useInView'

const DIGITS = Array.from({ length: 30 }, (_, i) => i % 10)

/**
 * Truck-odometer style number: each digit is a rolling column that spins
 * through the numbers and settles on its value when scrolled into view.
 */
export default function Odometer({ value, suffix = '' }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const digits = String(value).split('')

  return (
    <span ref={ref} className="inline-flex items-start tabular-nums" aria-label={`${value}${suffix}`}>
      {digits.map((d, i) => {
        // Land on the third loop so every column visibly rolls.
        const target = inView ? 20 + Number(d) : 0
        return (
          <span key={i} className="odo-col" aria-hidden="true">
            <span style={{ transform: `translateY(-${target}em)`, transitionDelay: `${i * 120}ms` }}>
              {DIGITS.map((n, k) => (
                <span key={k} className="block h-[1em]">
                  {n}
                </span>
              ))}
            </span>
          </span>
        )
      })}
      {suffix && (
        <span aria-hidden="true" className="leading-none whitespace-pre">
          {suffix}
        </span>
      )}
    </span>
  )
}
