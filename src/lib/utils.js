/** Turns a display phone number into a tel: link. */
export const tel = (number) => `tel:${number.replace(/[^\d+]/g, '')}`
