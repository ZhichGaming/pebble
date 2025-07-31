import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "./definitions";
import { cookies } from "next/headers";
import { ClientUser } from "./schema";

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 seconds from now")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("[@/lib/mongodb/session.ts 25] Failed to verify session: " + error);
  }
}

export async function createSession(clientUser: ClientUser) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({
    userId: clientUser._id.toString(),
    expiresAt,
  });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("user", JSON.stringify(clientUser), {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  return session;
}

export async function updateSession() {
  const cookieStore = await cookies();

  const session = cookieStore.get("session")?.value;
  const user = cookieStore.get("user")?.value;

  const payload = await decrypt(session);

  if (!session || !payload) {
    cookieStore.delete("session");
    cookieStore.delete("user");

    return null;
  }

  const expires = new Date(Date.now() + 60 * 60 * 1000);

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("user", JSON.stringify(user), {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

