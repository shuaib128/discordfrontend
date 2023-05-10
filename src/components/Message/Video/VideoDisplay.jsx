import React from 'react'
import { Box } from '@mui/system';
import { BackendLink } from '../../../utilits/BackendLink';

const VideoDisplay = ({ message }) => {
    return (
        <Box>
            {message.videos.length !== 0 ?
                <Box
                    sx={{
                        width: ["100%", "350px", "350px", "350px"]
                    }}
                >
                    {message.videos.map((video, _) => {
                        return (
                            <Box
                                key={video.id}
                            >
                                <video
                                    src={BackendLink + video.video}
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
                    })}
                </Box> :
                <Box></Box>
            }
        </Box>
    )
}

export default VideoDisplay