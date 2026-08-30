import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";

const config = defineCloudflareConfig();
config.default.minify = true;
config.cloudflare = {
  useWorkerdCondition: false,
};

export default config;
