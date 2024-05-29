import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import KeycloakProvider from "next-auth/providers/keycloak";

import jose from "jose";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      return session;
    },
  },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    KeycloakProvider({
      clientId: process.env.REACT_APP_KC_CLIENT_ID,
      clientSecret: process.env.REACT_APP_KC_SECRET,
      issuer: process.env.REACT_APP_KC_ISSUER,
      id: "keycloak",
      name: "keycloak",
      jwks_endpoint:
        "https://keycloak.devadmin.orchestr8.cloud/realms/orchestrate/protocol/openid-connect/certs",
    }),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);
