export const imageOrVideo = (fileName) => {
    // Extract the file extension from the file name
    const lastDotIndex = fileName.lastIndexOf('.');
    const fileExtension = fileName.slice(lastDotIndex + 1).toLowerCase();

    /**Check if the file extension corresponds to an image or a video */
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
        return 'image'
    } else if (['mp4', 'mov', 'avi', 'wmv'].includes(fileExtension)) {
        return 'video'
    } else {
        return 'unknown'
    }
}