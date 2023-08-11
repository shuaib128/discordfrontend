import { imageOrVideo } from "../../../utilits/Image/imageOrVideo";
import { resizeImageFile } from "../../../utilits/Compression/imageCompress";

export const transformedData = async (mediaFiles, postID, username) => {
    const transformedData = [];

    // Create an array of Promises for each file transformation
    const transformationPromises = mediaFiles.map(async (file) => {
        if (typeof file === 'object' && file instanceof File) {
            if (imageOrVideo(file.name) === "image") {
                const resizedFile = await resizeImageFile(file, 840, 680);

                const dataUrl = await new Promise((resolve) => {
                    const fileReader = new FileReader();
                    fileReader.onload = (event) => resolve(event.target.result);
                    fileReader.readAsDataURL(resizedFile);
                });

                transformedData.push({ type: "img", dataUrl: dataUrl });

            } else if (imageOrVideo(file.name) === "video") {
                const videoChunks = []
                const CHUNK_SIZE = 1024 * 1024; // 1MB
                const SIZE = file.size;
                const NUM_CHUNKS = Math.floor(SIZE / CHUNK_SIZE) + 1;
                let start = 0;
                let end = CHUNK_SIZE;
                const currentDate = new Date().toLocaleString();
                const randomString = [...Array(10)].map(() => Math.random().toString(36)[2]).join('');
                const filename = `${postID}-${username}-${currentDate}-${randomString}-${file.name}`

                for (let i = 0; i < NUM_CHUNKS; i++) {
                    const chunk = file.slice(start, end);
                    videoChunks.push({ chunk: chunk })

                    start = end;
                    end = start + CHUNK_SIZE;
                }
                transformedData.push({
                    type: "vid", filename: filename, videoChunks: videoChunks
                })
            }
        } else {}
    });

    // Wait for all the file transformations to complete
    await Promise.all(transformationPromises);

    // Return the transformedData array
    return transformedData;
};