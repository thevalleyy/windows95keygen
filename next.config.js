module.exports = {
    async rewrites() {
        return [
            {
                source: "/sus",
                destination: "/sus.txt",
            },
        ];
    },
};
