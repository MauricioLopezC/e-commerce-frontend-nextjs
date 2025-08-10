/**
 * Used to parse numeric search params like limit and page,
 * if param is not a number use fallback value
 */
export function parseQueryNumber(value: string | undefined | string[], fallback: number): number {
  const parsed = Number(value)
  return isNaN(parsed) ? fallback : parsed
}
