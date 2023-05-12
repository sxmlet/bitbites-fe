export const config = {
  bitesApi: process.env.NEXT_PUBLIC_BITES_API,
  bucket: process.env.BUCKET,
  // auth0 configuration.
  callbackUrl: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL ?? '',
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN ?? '',
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ?? '',
}
