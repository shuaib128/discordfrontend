const dbName = 'postTempDataBase';
const objectStoreName = 'postTempDataBaseObjectStore';

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(dbName, 1);

        request.onerror = (event) => {
            console.error('Database error:', event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore(objectStoreName, { keyPath: 'id' });
            // Add any desired indexes
        };
    });
};

export const storeDataInIndexedDB = async (data) => {
    try {
        // Convert all Blob to Base64 upfront
        for (const item of data) {
            if (item.files) {
                for (let file of item.files) {
                    if (file.videoChunks) {
                        for (let chunk of file.videoChunks) {
                            if (chunk.chunk instanceof Blob) {
                                chunk.chunk = await blobToBase64(chunk.chunk);
                            }
                        }
                    }
                }
            }
        }

        // Now create the transaction and store data
        const db = await openDatabase();
        const transaction = db.transaction(objectStoreName, 'readwrite');
        const objectStore = transaction.objectStore(objectStoreName);

        // use put instead of add to allow updates as well as inserts
        for (const item of data) {
            objectStore.put(item);
        }

        transaction.oncomplete = () => {
            // console.log("Transaction completed");
        };
        transaction.onerror = () => {
            // console.log("Transaction not completed:", transaction.error);
        };
    } catch (error) {
        console.error('Data storage error:', error);
    }
};

export const retrieveDataFromIndexedDB = async () => {
    return new Promise((resolve, reject) => {
        openDatabase()
            .then((db) => {
                const transaction = db.transaction(objectStoreName, 'readonly');
                const objectStore = transaction.objectStore(objectStoreName);

                const request = objectStore.getAll();

                request.onsuccess = (event) => {
                    let data = event.target.result;
                    resolve(data);
                };

                request.onerror = (event) => {
                    console.error('Data retrieval error:', event.target.error);
                    reject(event.target.error);
                };
            })
            .catch((error) => {
                console.error('Database error:', error);
                reject(error);
            });
    });
};

export const modifyDataToIndexedDB = async (data) => {
    const db = await openDatabase();

    // Convert all Blob to Base64 upfront
    if (data[0].videoChunks) {
        // Make sure all chunks are converted to base64 before proceeding
        await Promise.all(data[0].videoChunks.map(async (chunk) => {
            if (chunk.chunk instanceof Blob) {
                chunk.chunk = await blobToBase64(chunk.chunk);
            }
        }));
    }

    // Start a transaction and get a reference to the object store
    const transaction = db.transaction(objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(objectStoreName);

    // Retrieve the object to update using the specified key
    const getObjectRequest = objectStore.get(1);

    getObjectRequest.onerror = (event) => {
        console.error('Failed to retrieve object:', event.target.error);
    };

    getObjectRequest.onsuccess = (event) => {
        // Get the retrieved object
        const objectToUpdate = event.target.result;

        // Add a new array to the object
        objectToUpdate.files = data

        // Update the object in the object store
        const updateObjectRequest = objectStore.put(objectToUpdate);

        updateObjectRequest.onerror = (event) => {
            console.error('Failed to update object:', event.target.error);
        };

        updateObjectRequest.onsuccess = (event) => {
            // console.log("Object updated successfully");
        };
    }
}
export const clearDataFromIndexedDB = async () => {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(objectStoreName, 'readwrite');
        const objectStore = transaction.objectStore(objectStoreName);
        const request = objectStore.clear();

        request.onsuccess = () => { };
    } catch (error) {
        console.error('Data clearing error:', error);
    }
};