import { Liveblocks } from "@liveblocks/node";

let _liveblocks: Liveblocks | null = null;

export function getLiveblocks(): Liveblocks {
  if (!_liveblocks) {
    if (!process.env.LIVEBLOCKS_SECRET_KEY) {
      throw new Error("LIVEBLOCKS_SECRET_KEY is not set in environment variables");
    }
    _liveblocks = new Liveblocks({
      secret: process.env.LIVEBLOCKS_SECRET_KEY,
    });
  }
  return _liveblocks;
}

// Keep backward compat export as a getter proxy
export const liveblocks = new Proxy({} as Liveblocks, {
  get(_target, prop) {
    return getLiveblocks()[prop as keyof Liveblocks];
  },
});