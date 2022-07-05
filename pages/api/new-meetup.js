//api/new-meetup
import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://jason:Cao-xu870418-@cluster0.nezxxhh.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db("jason");
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close();
    res.status(201).json({ message: "Result inserted successfully!" });
  }
};

export default handler;
