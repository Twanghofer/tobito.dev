/** Title-case a tag for display; stored values stay lowercase for matching. */
export function formatTag(tag: string): string {
  return tag.replace(/\b[\p{L}\p{N}]/gu, (char) => char.toUpperCase());
}
