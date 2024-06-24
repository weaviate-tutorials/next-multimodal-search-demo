"use server";

import weaviate from "weaviate-client";


export async function vectorSearch(searchTerm: string) {
  const client = await weaviate.connectToWeaviateCloud(process.env.WEAVIATE_HOST_URL || '',{
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY || ''),
    headers: {
      'X-Palm-Api-Key': process.env.GOOGLE_KEY || ''
    }
  },
);
    
const myCollection = client.collections.get('PalmMultimodalSearch');


const response = await myCollection.query.nearText(searchTerm, {
limit: 8,
returnMetadata: ['distance'],
})

return response
   
  }

