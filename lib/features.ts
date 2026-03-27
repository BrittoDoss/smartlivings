export function isClientLoginEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_CLIENT_LOGIN === "true";
}
