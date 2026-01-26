import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { apiLeggere } from "@/app/_services/api";
import { login } from "@/app/_services/api/login";

// No topo do seu arquivo authOptions
console.log("Variável SECRET carregada?", !!process.env.NEXTAUTH_SECRET);

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await login({
          email: credentials?.email || "",
          password: credentials?.password || "",
        });

        if (!user) {
          return null;
        }

        return user;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        } as any;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "github") {
        try {
          const res = await apiLeggere({
            url: "/login-social",
            method: "POST",
            data: {
              email: user.email,
              firstName: user.name?.split(" ")[0] || "",
              lastName: user.name?.split(" ")[1] || "",
              companyId: null,
              role: "employee",
              phone: null,
              hasWhatsapp: false,
              profilePicture: null,
            },
          });

          if (!res.data) {
            throw new Error("Falha ao autenticar usuário via GitHub");
          }

          (user as any).socialLogin = res.data;
          return true;
        } catch (error) {
          console.error("Erro no login social:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      // LOGIN NORMAL
      if (user) {
        if ((user as any)?.socialLogin) {
          return { ...token, ...(user as any).socialLogin };
        }

        return { ...token, ...user };
      }

      // UPDATE VIA session.update()
      if (trigger === "update" && session?.user) {
        return {
          ...token,
          ...session.user,
        };
      }

      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken as string;
      session.user = token;

      return session;
    },
  },
  session: {
    strategy: "jwt",

    maxAge: 60 * 60 * 24, // 24 horas
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
};
