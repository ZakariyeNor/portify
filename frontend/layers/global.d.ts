declare module '*.css';

declare module 'next-pwa' {
  import { NextConfig } from 'next';
 
  interface PWAConfig {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    scope?: string;
    sw?: string;
    runtimeCaching?: any[];
    buildExcludes?: (string | RegExp)[];
    publicExcludes?: string[];
    cacheOnFrontEndNav?: boolean;
    dynamicStartUrl?: boolean;
    dynamicStartUrlRedirect?: string;
    reloadOnOnline?: boolean;
    fallbacks?: {
      document?: string;
      image?: string;
      audio?: string;
      video?: string;
      font?: string;
    };
  }
 
  function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig;
 
  export default withPWA;
}
