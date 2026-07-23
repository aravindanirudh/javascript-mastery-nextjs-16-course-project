import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the global object to include our mongoose cache object
declare global {
   
  var mongooseConnection: MongooseConnection | undefined;
}

// Ensure the cache object is available in the global scope
const cached: MongooseConnection = global.mongooseConnection || {
  conn: null,
  promise: null,
};

if (!global.mongooseConnection) {
  global.mongooseConnection = cached;
}

/**
 * Connects to MongoDB and returns the Mongoose instance.
 * Reuses the existing connection if it is already established.
 *
 * @returns {Promise<Mongoose>} A promise that resolves to the Mongoose instance.
 */
export const connectToDatabase = async (): Promise<Mongoose> => {
  // If a connection is already established, return it immediately
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise is not yet created, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => mongooseInstance);
  }

  try {
    // Await the promise to establish the connection
    cached.conn = await cached.promise;
  } catch (error) {
    // Clear the promise if connection fails to allow retries on subsequent calls
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};
