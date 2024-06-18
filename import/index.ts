import { createCollection, deleteCollection } from './collection.ts';
import { importMediaFiles } from './import.ts';

const collectionName = 'PalmMultimodalSearch';

const run = async () => {
  await deleteCollection(collectionName);
  await createCollection(collectionName);
  await importMediaFiles(collectionName);
}

run();


