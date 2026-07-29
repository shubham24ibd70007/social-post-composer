export function generateToken(user) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    name: user.name,
    email: user.email,
    role: user.role,
    iat: Date.now(),
  };

  const signature = "mock-signature";

  return [
    btoa(JSON.stringify(header)),
    btoa(JSON.stringify(payload)),
    btoa(signature),
  ].join(".");
}

export function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    return null;
  }
}