// @ts-check
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    distDir: 'build',
    
    webpack: (config, context) => {
      config.watchOptions = {
        poll: 2000,
        aggregateTimeout: 800
      }

      /*config.module.rules.push({
        rules: [
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          }
        ]
      })*/

      return config
    }
}
   
module.exports = nextConfig