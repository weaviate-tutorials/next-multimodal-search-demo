import weaviate, { type WeaviateClient } from 'weaviate-client';
import 'dotenv/config'

let client: WeaviateClient;

export const getWeaviateClient = async () => {
  if (!client) {
    client = await weaviate.connectToWeaviateCloud(process.env.WEAVIATE_HOST_URL || '',{
        authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_ADMIN_KEY || ''),
        headers: {
          'X-Palm-Api-Key': process.env.GOOGLE_API_KEY || ''
        }
      },
    )
  };

  return client;
}