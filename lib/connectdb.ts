const isEdgeRuntime = typeof (globalThis as { EdgeRuntime?: unknown }).EdgeRuntime !== 'undefined'

interface Cached {
  conn: any | null;
  promise: Promise<any> | null;
}

declare global {
  var mongoose: Cached | undefined;
}

const cached: Cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const connectDB = async () => {
  if (isEdgeRuntime) {
    return true
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = import('mongoose').then((mongoose) => {
      return mongoose.default.connect(MONGODB_URI, opts).then((mongoose) => {
        cached.conn = mongoose;
        return mongoose;
      });
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

export default connectDB