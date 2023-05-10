const chunkSize = 16384; // 16 KB
export const sendVideoChunks = (
    filename,
    socket,
    videoBuffer,
    startIndex = 0,
    resolve,
    setVideoFileSentPercentage
) => {
    if (startIndex < videoBuffer.byteLength) {
        const endIndex = startIndex + chunkSize;
        const chunk = videoBuffer.slice(startIndex, endIndex);
        socket.send(chunk);

        // Calculate and log the progress
        const progress = ((endIndex / videoBuffer.byteLength) * 100).toFixed(2);
        // console.log(`Sent ${progress}% of the ${filename}`);
        setVideoFileSentPercentage(progress)

        setTimeout(() => {
            sendVideoChunks(
                filename,
                socket,
                videoBuffer,
                endIndex,
                resolve,
                setVideoFileSentPercentage
            );
        }, 100);
    } else {
        // Send an 'end' message to notify the server that the video file has been sent completely
        socket.send(JSON.stringify({ type: "end" }));

        // Resolve the Promise when the video is sent
        resolve();
    }
};