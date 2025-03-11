import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ ERROR: MONGODB_URI no está definido en las variables de entorno");
  throw new Error("MONGODB_URI no está definido. Asegúrate de configurarlo en .env.local");
}

const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    console.log("⚡ Conectando a MongoDB en modo desarrollo...");
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect()
      .then((conn) => {
        console.log("✅ Conectado a MongoDB en modo desarrollo");
        return conn;
      })
      .catch((err) => {
        console.error("❌ Error al conectar con MongoDB:", err);
        throw err;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  console.log("⚡ Conectando a MongoDB en modo producción...");
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then((conn) => {
      console.log("✅ Conectado a MongoDB en modo producción");
      return conn;
    })
    .catch((err) => {
      console.error("❌ Error al conectar con MongoDB:", err);
      throw err;
    });
}

export default clientPromise;