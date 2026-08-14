export function isExternalLink(path: string) {
  return /^https?:\/\//.test(path)
}
