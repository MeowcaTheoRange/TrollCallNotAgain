import { MongoClient, MongoClientOptions } from "mongodb";

if (process.env.MONGODB_DATABASE == null) process.exit();
const options: MongoClientOptions = {};

let client = new MongoClient(process.env.MONGODB_DATABASE, options);
let clientPromise: Promise<MongoClient> = client.connect();

export const mainDB = client.db("trollcall");

export default clientPromise;
