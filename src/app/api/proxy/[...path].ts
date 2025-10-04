// pages/api/proxy/[...path].ts
import { createProxyMiddleware } from "http-proxy-middleware";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = createProxyMiddleware({
  target: process.env.API_URL, // tanpa NEXT_PUBLIC_
  changeOrigin: true,
  pathRewrite: {
    "^/api/proxy": "", // Hilangkan '/api/proxy' dari path
  },
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve, reject) => {
    proxy(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve();
    });
  });
}
