import { MongoClient } from 'mongodb'

// /api/new-meetup

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const { title, image, address, description } = data;

        // In this API route, the code defined in here will never
        // end up on the client-side, so it is SAFE to store
        // credentials within the code here.
        const client = MongoClient.connect('mongodb+srv://seb:qdCUrCYY6feHSaj@cluster0.2nqla.mongodb.net/react-meetups?retryWrites=true&w=majority');
        const db = (await client).db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        (await client).close();

        // Create a 201 HTTP response (something inserted successfully)
        res.status(201).json({message: 'Meetup inserted!'});
    }
}

export default handler;