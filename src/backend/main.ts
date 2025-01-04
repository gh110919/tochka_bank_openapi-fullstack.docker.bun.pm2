import { config } from "dotenv";
import { json } from "express";
import { readFileSync } from "fs";
import { createServer } from "https";
import { router } from "./middlewares/router";
import { networkInterfaces } from "os";

export const { parsed } = config({ path: ".local/.env" });

(async function () {
  const express = (await import("express")).default();
  const cors = (await import("cors")).default({
    origin: parsed?.FRONTEND_ORIGIN,
    credentials: true,
  });

  const listener = () => {
    try {
      express.use(json()).use(cors).use("/api", router);
    } catch (error) {
      console.clear();
      console.error(error);
    }
  };

  const ssl = {
    key: readFileSync(".local/private_key.pem"),
    cert: readFileSync(".local/fullchain.pem"),
  };

  createServer(ssl, express).listen(parsed?.HTTPS, listener);

  const host = (() => {
    const interfaces = Object.values(networkInterfaces()).flat();
    const ip = interfaces.find((e) => e?.family === "IPv4" && !e?.internal);
    return {
      https: `https://${ip?.address}:${parsed?.HTTPS}`,
    };
  })();

  console.log(host);
})();
