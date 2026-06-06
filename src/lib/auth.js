import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
 

const client = new MongoClient(process.env.MONGODB_URL);
export const db = client.db("hireloopBD");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
      },
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
