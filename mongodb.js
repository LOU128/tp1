const { MongoClient, ServerApiVersion } = require('mongodb');

// Remplacez <password> par votre mot de passe réel
const uri = "mongodb+srv://louai:<>@cluster0.cubjrdi.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB.");
    
    // Ici, vous pouvez effectuer des opérations sur la base de données
    const database = client.db("nomDeVotreBase");
    const collection = database.collection("nomDeVotreCollection");
    // Exemple d'opération: trouver tous les documents
    const documents = await collection.find({}).toArray();
    console.log(documents);

  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
