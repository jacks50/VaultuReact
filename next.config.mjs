/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    webpack: (config, context) => {
        config.watchOptions = {
            poll: 2000,
            aggregateTimeout: 800
        }

        /*config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });*/

        return config
    }
};

export default nextConfig;
