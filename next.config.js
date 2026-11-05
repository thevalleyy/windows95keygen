/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/sus",
                destination: "/sus.txt",
            },
        ];
    },
};

export default nextConfig;