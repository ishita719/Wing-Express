/**
 * Turns a display phone number into a tel: link with the country code,
 * e.g. "(236) 888-3135" → "tel:+12368883135".
 */
export const tel = (number) => {
  const digits = number.replace(/\D/g, '')
  return `tel:+${digits.length === 10 ? `1${digits}` : digits}`
}
