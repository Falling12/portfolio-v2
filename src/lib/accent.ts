export const ACCENT_COLORS = {
  blue: 'oklch(0.55 0.17 255)',
  green: 'oklch(0.58 0.16 145)',
  orange: 'oklch(0.62 0.17 45)',
  red: 'oklch(0.52 0.18 20)',
} as const

export type AccentKey = keyof typeof ACCENT_COLORS

export function resolveAccent(key: string | null | undefined): string {
  if (key && key in ACCENT_COLORS) return ACCENT_COLORS[key as AccentKey]
  return ACCENT_COLORS.blue
}

// Hex equivalents of ACCENT_COLORS for renderers (e.g. Satori/next-og image
// generation) that don't reliably parse oklch().
export const ACCENT_COLORS_HEX = {
  blue: '#3B6FEF',
  green: '#2FA968',
  orange: '#E2762E',
  red: '#D1443B',
} as const

export function resolveAccentHex(key: string | null | undefined): string {
  if (key && key in ACCENT_COLORS_HEX) return ACCENT_COLORS_HEX[key as AccentKey]
  return ACCENT_COLORS_HEX.blue
}
