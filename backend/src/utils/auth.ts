import { getSignedCookie, setSignedCookie } from "hono/cookie";
import type { Context } from "hono";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./token.ts";

const issueTokens = async (c: Context, user: any) => {
  const secret = process.env.JWT_SECRET_KEY!;
  const cookieSecret = process.env.SECRET_COOKIE!;

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await setSignedCookie(c, "huhoh_token", accessToken, secret, {
    httpOnly: true,
    secure: true,
    domain: ".psstee.dev",
    path: "/",
    maxAge: 60 * 15,
  });

  await setSignedCookie(c, "huhoh_refresh_token", refreshToken, cookieSecret, {
    httpOnly: true,
    secure: true,
    domain: ".psstee.dev",
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { accessToken, refreshToken };
};

const getAuthState = async (c: Context) => {
  const secret = process.env.JWT_SECRET_KEY!;
  const cookieSecret = process.env.SECRET_COOKIE!;

  try {
    const accessToken = await getSignedCookie(c, secret, "huhoh_token");
    const refreshToken = await getSignedCookie(
      c,
      cookieSecret,
      "huhoh_refresh_token",
    );

    if (typeof refreshToken !== "string") {
      console.log("Refresh token not a string");
      return { isValid: false };
    }

    const refreshPayload = verifyRefreshToken(refreshToken);
    if (!refreshPayload?.id || !refreshPayload?.email) {
      console.log("Invalid refresh token payload");
      return { isValid: false };
    }

    let needsNewAccessToken = true;
    if (typeof accessToken === "string") {
      const accessPayload = verifyAccessToken(accessToken);
      needsNewAccessToken = !accessPayload;
    }

    return {
      isValid: true,
      userId: refreshPayload.id,
      userEmail: refreshPayload.email,
      needsNewTokens: needsNewAccessToken,
    };
  } catch (e) {
    console.log("Auth state error:", e);
    return { isValid: false };
  }
};

export { issueTokens, getAuthState };
