import { WeaviateClient, generateUuid5, type Collection } from 'weaviate-client';
import { getWeaviateClient } from './client.ts';
import { FileInfo, getBase64, listFiles } from './util.ts';

const sourceBase = 'public';
const sourceImages = sourceBase + '/image/'
const sourceAudio = sourceBase + '/audio/';
const sourceVideo = sourceBase + '/video/';

const client: WeaviateClient = await getWeaviateClient();


export const importMediaFiles = async (collectionName: string) => {

    const bindCollection = client.collections.get(collectionName); // make universal 

    await insertImages(bindCollection);
    await insertAudio(bindCollection);
    await insertVideo(bindCollection);
}

// const insertImages = async (collectionName: string) => {
//     let batcher: ObjectsBatcher = client.batch.objectsBatcher();
//     let counter = 0;
//     const batchSize = 5;

//     const files = listFiles(sourceImages);
//     console.log(`Importing ${files.length} images.`)

//     for (const file of files) {
//         const item = {
//             name: file.name,
//             image: getBase64(file.path),
//             media: 'image'
//         };

//         console.log(`Adding [${item.media}]: ${item.name}`);


//         batcher = batcher.withObject({
//             class: collectionName,
//             properties: item,
//             id: generateUuid5(file.name)
//         });

//         if (++counter == batchSize) {
//             console.log(`Flushing ${counter} items.`)

//             // flush the batch queue
//             await batcher.do();

//             // restart the batch queue
//             counter = 0;
//             batcher = client.batch.objectsBatcher();
//         }
//     }

//     if (counter > 0) {
//         console.log(`Flushing remaining ${counter} item(s).`)
//         await batcher.do();
//         // const res = await batcher.do();
//         // console.log(res);
//     }
// }

const insertImages = async (myCollection: Collection) => {

    const batchSize = 20;
    let dataObject = [];
    // const imagesCollection = client.collections.get(collectionName);

    const files = listFiles(sourceImages);
    console.log(`Importing ${files.length} images.`);

    for (const file of files) {
        console.log(`Adding ${file.name}`);

        // const fileName = file.name.split('.')[0];

        const item = {
            name: file.name,
            extension: file.name.split('.')[1],
            image: getBase64(file.path),
            media: 'image',
        };

        dataObject.push(item);
    }

    await myCollection.data.insertMany(dataObject);
}

const insertAudio = async (myCollection: Collection) => {

    const batchSize = 20;
    let dataObject = [];
    // const imagesCollection = client.collections.get(collectionName); // make universal 

    const files = listFiles(sourceAudio);
    console.log(`Importing ${files.length} audios.`);

    for (const file of files) {
        console.log(`Adding ${file.name}`);

        // const fileName = file.name.split('.')[0];

        const item = {
            name: file.name,
            extension: file.name.split('.')[1],
            image: getBase64(file.path),
            media: 'audio',
        };

        dataObject.push(item);
    }

    await myCollection.data.insertMany(dataObject);
}

const insertVideo = async (myCollection: Collection) => {

    const batchSize = 20;
    let dataObject = [];
    // const imagesCollection = client.collections.get(collectionName); // make universal 

    const files = listFiles(sourceVideo);
    console.log(`Importing ${files.length} videos.`);

    for (const file of files) {
        console.log(`Adding ${file.name}`);

        // const fileName = file.name.split('.')[0];

        const item = {
            name: file.name,
            extension: file.name.split('.')[1],
            image: getBase64(file.path),
            media: 'video',
        };

        dataObject.push(item);
    }

    await myCollection.data.insertMany(dataObject);
}

