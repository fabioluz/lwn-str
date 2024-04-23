
export function extractIdFromURL(url: string): number {
  const parts = url.split('/').filter(x => x !== '');
  return Number.parseInt(parts[parts.length - 1]);
}