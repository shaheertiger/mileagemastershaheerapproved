/** Joins class names, dropping anything falsy (CSS module lookups included). */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
