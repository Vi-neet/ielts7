import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";

const config = defineCloudflareConfig();
config.default.minify = true;

export default config;
