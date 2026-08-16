function timestampToSeconds(timestamp: string): number | undefined {
  const parts = timestamp.split(':').map(Number)
  if (parts.length === 0 || parts.some((part) => Number.isNaN(part))) return undefined
  return parts.reduce((seconds, part) => seconds * 60 + part, 0)
}

export function withYoutubeTimestamp(url: string, timestamp?: string) {
  if (!timestamp) return url
  const seconds = timestampToSeconds(timestamp)
  if (seconds === undefined) return url
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}t=${seconds}s`
}
