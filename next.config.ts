import type { NextConfig } from 'next';
import { basePath } from './lib/paths';
const config: NextConfig = { basePath, output: 'export', trailingSlash: true, images: { unoptimized: true }, poweredByHeader: false };
export default config;
