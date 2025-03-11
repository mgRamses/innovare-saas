import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("dev"); // Cambia "testDB" por el nombre de tu base de datos
    const collection = db.collection("testCollection");

    if (req.method === "POST") {
      const result = await collection.insertOne({ message: "MongoDB funcionando 🚀", createdAt: new Date() });
      return res.status(201).json({ success: true, insertedId: result.insertedId });
    }

    if (req.method === "GET") {
      const data = await collection.find().toArray();
      return res.status(200).json({ success: true, data });
    }

    return res.status(405).json({ success: false, message: "Método no permitido" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}