/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: "24.83.27.62",
                port: '4002',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
