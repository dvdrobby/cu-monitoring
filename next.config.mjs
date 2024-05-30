/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals = [...config.externals, "bcrypt"];
        config.experiments = { ...config.experiments, topLevelAwait: true }
        return config;
      },
      
};

export default nextConfig;
