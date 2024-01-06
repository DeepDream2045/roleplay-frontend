import NextAuth from "next-auth";

import Google from "next-auth/providers/google";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        Google({
            id: "google",
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // console.log({ account });
            if (account?.provider === "google") {
                // console.log({ profile });
                user.email = profile?.email;
                user.name = profile?.name;
            }
            return true;
        },

        async jwt({ token, account }) {
            // console.log({ token });
            // console.log({ account });
            if (account?.id_token) {
                token.id_token = account?.id_token;
            }

            return token;
        },

        async session({ session, token, user }) {
            // console.log({ session });
            // console.log({ tokenInSession: token });
            // console.log({ user });
            session.user!.id_token = token?.id_token;
            return session;
        },
    },
});
