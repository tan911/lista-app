/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        config.externals.push('@node-rs/argon2')

        return config
    },
    experimental: {
        serverComponentsExternalPackages: ['oslo'],
    },
    transpilePackages: ['lucide-react'],
}

export default nextConfig
