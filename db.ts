import { DataAPIClient } from "@datastax/astra-db-ts";

const { ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT } = process.env;

if (!ASTRA_DB_APPLICATION_TOKEN || !ASTRA_DB_API_ENDPOINT) {
  throw new Error(
    "❌ Missing Astra credentials. Please check your .env.local for ASTRA_DB_APPLICATION_TOKEN and ASTRA_DB_API_ENDPOINT"
  );
}

// Initialize Astra DB client
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN, {
  httpOptions: {
    client: "fetch", // required in some environments
  },
});

// Connect to the specific database
const db = client.db(ASTRA_DB_API_ENDPOINT);

// Optional debug: test connection and show collections
(async () => {
  try {
    const collections = await db.listCollections();
    console.log("✅ Connected to Astra DB. Available collections:", collections);
  } catch (error) {
    console.error("❌ Failed to connect to Astra DB:", error);
  }
})();

export default db;
