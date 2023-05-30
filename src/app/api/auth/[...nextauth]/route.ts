import { ObjectId } from "mongodb";
import NextAuth from "next-auth";
import DiscordProvider, { DiscordProfile } from "next-auth/providers/discord";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb/mongodb";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise, { databaseName: "trollcall" }),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID ?? "",
      clientSecret: process.env.DISCORD_SECRET ?? "",
      profile(profile: DiscordProfile, tokens) {
        return {
          id: profile.id.toString(),
          full: false,
        }; // barebones User
      },
    }),
  ],
});

export { handler as GET, handler as POST };
