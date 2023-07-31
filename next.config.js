const fs = require("fs-extra");
const path = require("path");

// const RemoveUserRoutesPlugin = require('./scripts/removeUserRoutes')

const roles = ["user", "admin"];
const selectedRole = process.env.NEXT_PUBLIC_APP_TYPE || "user";

const excludeFolder = selectedRole === "admin" ? "user" : "admin";

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: new RegExp(`pages[\\\\/]${excludeFolder}[\\\\/]`),
        loader: "emit-file-loader",
        options: {
          name: "dist/pages/[name].js",
        },
      });
    }
    return config;
  },
  experimental: {
    outputFileTracingExcludes: {
      pages: [`src/pages/${excludeFolder}/**/*`, ``],
    },
  },
};

module.exports = nextConfig;
