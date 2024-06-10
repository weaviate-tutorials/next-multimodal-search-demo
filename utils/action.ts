"use server";

import weaviate from "weaviate-client";
// import { TrackType } from "../types.ts";


export async function vectorSearch(searchTerm: string) {
  const client = await weaviate.connectToWeaviateCloud(process.env.WCS_URL!!, {
    authCredentials: new weaviate.ApiKey(process.env.WCS_API_KEY!!),
    headers: {
      "X-OpenAI-Api-Key": process.env.OPENAI_APIKEY!!,
    },
  });
    
    const myCollection = client.collections.get('BindExample')

    const response = await myCollection.query.nearText(searchTerm,{
        limit: 8
    })

    console.log('yoooo',response)
    return response
  }

