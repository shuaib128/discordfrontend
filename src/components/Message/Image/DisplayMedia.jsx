import React from 'react'
import { Box } from '@mui/system';
import { BackendLink } from '../../../utilits/BackendLink';
import { imageOrVideo } from '../../../utilits/Image/imageOrVideo';

const DisplayMedia = ({ Media, handleOpen }) => {
    return (
        <>
            {Media.length !== 0 ?
                <Box
                    sx={{
                        width: ["100%", "350px", "350px", "350px"]
                    }}
                >
                    {Media.map((media, _) => {
                        const media_id = media.id
                        const media_url = media.file

                        if (imageOrVideo(media_url) === "image") {
                            return (
                                <Box
                                    onClick={() => {
                                        handleOpen(BackendLink + media_url)
                                    }}
                                    key={media_id}
                                >
                                    <img
                                        style={{
                                            marginBottom: "7px",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }}
                                        key={media_id}
                                        src={BackendLink + media_url}
                                        alt=''
                                    />
                                </Box>
                            )
                        } else if (imageOrVideo(media_url) === "video") {
                            return (
                                <Box
                                    key={media_id}
                                >
                                    <video
                                        src={BackendLink + media_url}
                                        controls
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            marginBottom: "7px",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }}
                                    >

                                    </video>
                                </Box>
                            )
                        }
                    })}
                </Box> :
                <Box></Box>
            }
        </>
    )
}

export default DisplayMedia