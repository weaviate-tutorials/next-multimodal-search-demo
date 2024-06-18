import { WeaviateClient, generateUuid5, type Collection } from 'weaviate-client';
import { getWeaviateClient } from './client.ts';
import { getBase64, listFiles } from './util.ts';

const sourceBase = 'public';
const sourceImages = sourceBase + '/image/';
const sourceAudio = sourceBase + '/audio/'; // for Audio 
const sourceVideo = sourceBase + '/video/';

const client: WeaviateClient = await getWeaviateClient();


export const importMediaFiles = async (collectionName: string) => {

    const vertexCollection = client.collections.get(collectionName); 

    await insertImages(vertexCollection);
    // await insertAudio(vertexCollection);  # Uncomment to import Audio
    await insertVideo(vertexCollection);
}

const insertImages = async (myCollection: Collection) => {

    const batchSize = 10;
    let dataObject = [];

    const files = listFiles(sourceImages);
    console.log(`Importing ${files.length} images.`);

    let counter = 0

    for (let file of files) {
        console.log(`Adding ${file.name}`);
        
        const item = {
            name: file.name,
            extension: file.name.split('.')[1],
            image: getBase64(file.path),
            media: 'image',
        };

        dataObject.push(item);
        counter++

        if (counter % batchSize == 0) {
            await myCollection.data.insertMany(dataObject);

            dataObject = []
        }
    }

    if (counter % batchSize !== 0)
        await myCollection.data.insertMany(dataObject);
}
// Uncomment if you are using a model with an audio encoder
// const insertAudio = async (myCollection: Collection) => {

//     const batchSize = 5;
//     let dataObject = [];

//     const files = listFiles(sourceAudio);
//     console.log(`Importing ${files.length} audios.`);

//     let counter = 0;
//     for (let file of files) {
//         console.log(`Adding ${file.name}`);

//         const item = {
//             name: file.name,
//             extension: file.name.split('.')[1],
//             audio: getBase64(file.path),
//             media: 'audio',
//         };

//         dataObject.push(item);
//         counter++;

//         if (counter % batchSize == 0) {
//             await myCollection.data.insertMany(dataObject);
//             // Clear the dataObject array
//             dataObject = [];
//         }
//     }

//     if (counter % batchSize !== 0)
//         await myCollection.data.insertMany(dataObject);
// }

const insertVideo = async (myCollection: Collection) => {

    const batchSize = 1;

    const files = listFiles(sourceVideo);
    console.log(`Importing ${files.length} videos.`);

    console.log('meta', await myCollection.config.get())

    for (let file of files) {
        console.log(`Adding ${file.name}`);

        const item = {
            name: file.name,
            extension: file.name.split('.')[1],
            video: getBase64(file.path),
            media: 'video',
        };

        await myCollection.data.insert(item)
    }
}

