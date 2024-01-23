import Footer from '@/components/footer';
import Search from '../components/search'
import Link from 'next/link'

import weaviate, {
  WeaviateClient,
  WeaviateObject,
} from "weaviate-ts-client";
import Navigation from '@/components/navigation';

const client: WeaviateClient = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});

interface BindMediaObject {
  _additional: {
    certainty: number;
    id: string;
  };
  media: string;
  name: string;
}

export default async function Home({
  searchParams
}: {
  searchParams?: {
    search?: string;
  }
}) {
  const search = searchParams?.search || "";
  const data = await searchDB(search);

  return (
    <html lang="en">
      <body>
        <div className="fixed h-screen w-full bg-gradient-to-br from-lime-100 via-teal-50 to-amber-100" />
        
        <Navigation /> 

        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">

          <Search placeholder="Search for a word" />
          <div className="relative flex grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 p-20">

            {data.map((result: BindMediaObject) => (
              <div key={result?._additional.id} className="">

                <div className="h-40 w-50">
                  <p className=" w-16 h-6 mt-2 ml-2 block text-center whitespace-nowrap items-center justify-center rounded-lg translate-y-8 transform  bg-white px-2.5 py-0.5 text-sm text-black">
                    {result.media}
                  </p>
                  {result?.media == 'image' &&
                    <img
                      alt="Certainty: "
                      className='block object-cover w-full h-full rounded-lg'
                      src={
                        '/' + result.media + '/' + result.name
                      }
                    />
                  }

                  {result?.media == 'audio' &&
                    <audio controls src={
                      '/' + result.media + '/' + result.name
                    } className='block object-none w-full h-full rounded-lg'>
                      Your browser does not support the audio element.
                    </audio>
                  }

                  {result.media == 'video' &&
                    <video controls src={
                      '/' + result.media + '/' + result.name
                    } className='block object-none w-full h-full rounded-lg'>
                      Your browser does not support the video element.
                    </video>
                  }
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />

      </body>
    </html>
  )
}


async function searchDB(search: string) {

  const res = await client.graphql
    .get()
    .withClassName("BindExample")
    .withFields("media name _additional{ certainty id }")
    .withNearText({ concepts: [`${search}`] })
    .withLimit(8)
    .do();

  return res.data.Get.BindExample;
}
