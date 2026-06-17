import { decodeJwt } from "jose";

const VALID_ISSUERS: string[] = [];
const VALID_AUDIENCES: string[] = [];

export const validateToken = (token: string): boolean => {
  try {
    const payload = decodeJwt(token);
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      return false;
    }

    if (!payload.sub) {
      return false;
    }

    if (VALID_ISSUERS.length > 0) {
      if (!payload.iss || !VALID_ISSUERS.includes(payload.iss)) {
        return false;
      }
    }

    if (VALID_AUDIENCES.length > 0) {
      const aud = payload.aud;
      const audList = Array.isArray(aud) ? aud : aud ? [aud] : [];
      const hasValidAud = audList.some((a) => VALID_AUDIENCES.includes(a));
      if (!hasValidAud) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
};
