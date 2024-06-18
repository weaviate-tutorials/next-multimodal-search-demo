import Footer from '@/components/footer.tsx';
import Search from '../components/search.tsx'
import { vectorSearch } from '@/utils/action.ts';

import Navigation from '@/components/navigation.tsx';

export default async function Home({
  searchParams
}: {
  searchParams?: {
    search?: string;
  }
}) {
  const search = searchParams?.search || "people";
  const data = await vectorSearch(search);

  return (
    <html lang="en">
      <body>
        <div className="fixed h-screen w-full bg-gradient-to-br from-lime-100 via-teal-50 to-amber-100" />
        
        <Navigation /> 

        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">

          <Search placeholder="Search for a word" />
          <div className="relative flex grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 p-20">

            {data.objects.map((result) => (
              <div key={result.uuid} className="">

                <div className="h-40 w-50">
                  <div className="flex justify-between">
                  <p className="w-16 h-6 mt-2 ml-2 block text-center whitespace-nowrap items-center justify-center rounded-lg translate-y-8 transform  bg-white px-2.5 py-0.5 text-sm text-black">
                    { result.properties.media }
                  </p>
                  <p className="w-24 h-6 mt-2 mr-2 block text-center whitespace-nowrap items-center justify-end rounded-lg translate-y-8 transform  bg-white px-2.5 py-0.5 text-sm text-black">
                    dist: { result.metadata?.distance?.toString().slice(0,6) }
                  </p>
                  </div>
                  {result?.properties.media == 'image' &&
                    <img
                      alt="Certainty: "
                      className='block object-cover w-full h-full rounded-lg'
                      src={
                        '/' + result.properties.media + '/' + result.properties.name
                      }
                    />
                  }

                  {result?.properties.media == 'audio' &&
                    <audio controls src={
                      '/' + result.properties.media + '/' + result.properties.name
                    } className='block object-none w-full h-full rounded-lg'>
                      Your browser does not support the audio element.
                    </audio>
                  }

                  {result.properties.media == 'video' &&
                    <video controls src={
                      '/' + result.properties.media + '/' + result.properties.name
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

