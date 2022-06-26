import { MongoClient } from 'mongodb';

export default async function seeder(count: number) {
    const client = await MongoClient.connect(process.env.DB_CONNECTION);
    const db = client.db();

    //-----------------aircraft-------------------------
    let aircrafts = [];
    for (let i = 0; i < count; i++) {
        aircrafts.push({
            name: "aircraft " + i
        })
    }
    await db.collection("aircrafts").insertMany(aircrafts);

    //-----------------location-------------------------
    let locations = [];
    for (let i = 0; i < count; i++) {
        locations.push({
            name: "location " + i
        })
    }
    await db.collection("locations").insertMany(locations);

    console.log("***Fake data generated***")
}