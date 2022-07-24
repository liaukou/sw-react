export function getIfFromUrl(url: string): string {
  const parsedUrl = url.split('/').filter(Boolean)
  return parsedUrl[parsedUrl.length - 1]
}
