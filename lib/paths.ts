/** Build-time prefix for project hosting; Next links add this automatically. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
if (basePath && !/^(\/[A-Za-z0-9_-]+)+$/.test(basePath)) {
  throw new Error('NEXT_PUBLIC_BASE_PATH must be a slash-prefixed path without a trailing slash.');
}
export const publicPath = (route: string) => `${basePath}${route}`;
