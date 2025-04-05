import "server-only";
import { MongoClient } from "mongodb";

if (!process.env.DB_URI) {
  throw new Error('Invalid/Missing environment variable: "DB_URI"');
}

const uri = process.env.DB_URI;

const client = new MongoClient(uri);

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client;

