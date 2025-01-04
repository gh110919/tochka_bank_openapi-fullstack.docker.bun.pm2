import { readFileSync } from "fs";
import { config } from "dotenv";
import { defineConfig, ServerOptions } from "vite";

const options: ServerOptions = {
  host: "0.0.0.0",
  https: {
    key: readFileSync(".local/private_key.pem"),
    cert: readFileSync(".local/fullchain.pem"),
  },
};

export default defineConfig({
  plugins: [
    (await import("@vitejs/plugin-react-swc")).default(),
    (await import("vite-tsconfig-paths")).default(),
  ],
  define: {
    "process.env": config({ path: ".local/.env" }).parsed,
  },
  server: options,
  preview: options,
});
