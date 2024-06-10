import weaviate, { type WeaviateClient } from 'weaviate-client';
import 'dotenv/config'

let client: WeaviateClient;

export const getWeaviateClient = async () => {
  if (!client) {
    client = await weaviate.connectToLocal()
  };
  
  return client;
}