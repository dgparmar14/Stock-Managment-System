

import { NextResponse } from "next/server";
const { MongoClient } = require("mongodb");


export async function GET(request) {

    const query = request.nextUrl.searchParams.get("query");

    // const uri = "mongodb+srv://dgparmar1406:Ik6CnA0C0wfGYDiW@stcok-managment.sdarjny.mongodb.net/";
    const client = new MongoClient(process.env.MONGODB_URL);
    try {

        const database = client.db('Dhrumit');
        const inventory = database.collection('inventory');

        // Query for a movie that has the title 'Back to the Future'
      const product = await  inventory.aggregate([{
            $match: {
                    $or: [
                        { slug: { $regex: query, $options: "i" } },
                    ]
            }
        }
        ]).toArray();

        return NextResponse.json({ "success": true, product })
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}