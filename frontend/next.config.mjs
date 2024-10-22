/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        ppr: 'incremental', //'incremental'  allows to adopt PPR(partial prerendering) for specific routes.
    },
};

export default nextConfig;
