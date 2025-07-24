import { DataAPIClient } from "@datastax/astra-db-ts";

const { ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT } = process.env;

// During build time, we might not have all environment variables
// This is okay for static generation, but we'll check at runtime
const isBuildTime = process.env.NODE_ENV === 'production' && !ASTRA_DB_APPLICATION_TOKEN;

if (!isBuildTime && (!ASTRA_DB_APPLICATION_TOKEN || !ASTRA_DB_API_ENDPOINT)) {
  throw new Error(
    "❌ Missing Astra credentials. Please check your .env.local for ASTRA_DB_APPLICATION_TOKEN and ASTRA_DB_API_ENDPOINT"
  );
}

// Only initialize client if we have credentials
let db: any = null;

if (ASTRA_DB_APPLICATION_TOKEN && ASTRA_DB_API_ENDPOINT) {
  // Initialize Astra DB client
  const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN, {
    httpOptions: {
      client: "fetch", // required in some environments
    },
  });

  // Connect to the specific database
  db = client.db(ASTRA_DB_API_ENDPOINT);

  // Optional debug: test connection and show collections
  (async () => {
    try {
      const collections = await db.listCollections();
      console.log("✅ Connected to Astra DB. Available collections:", collections);
    } catch (error) {
      console.error("❌ Failed to connect to Astra DB:", error);
    }
  })();
} else {
  console.warn("⚠️ Astra DB credentials not found. Database connections will fail at runtime.");
}

export default db;
