import { mainDB } from "./mongodb";

export async function createOne(collection: string, doc: any) {
  const selectedCollection = mainDB.collection(collection);
  return await selectedCollection.insertOne(doc);
}

export async function readOne(collection: string, find: any) {
  const selectedCollection = mainDB.collection(collection);
  return await selectedCollection.findOne(find);
}

export function readMany(collection: string, find: any) {
  const selectedCollection = mainDB.collection(collection);
  return selectedCollection.find(find);
}

export async function countMany(collection: string, find: any) {
  const selectedCollection = mainDB.collection(collection);
  return await selectedCollection.countDocuments(find);
}

export async function replaceOne(collection: string, find: any, update: any) {
  const selectedCollection = mainDB.collection(collection);
  return await selectedCollection.replaceOne(find, update);
}

export async function updateOne(collection: string, find: any, update: any) {
  const selectedCollection = mainDB.collection(collection);
  return await selectedCollection.updateOne(find, update);
}

export async function deleteOne(collection: string, find: any) {
  const selectedCollection = mainDB.collection(collection);
  return await selectedCollection.findOneAndDelete(find);
}
