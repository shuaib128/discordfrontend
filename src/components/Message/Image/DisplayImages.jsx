import React from 'react'
import { Box } from '@mui/system';
import ReactGifPlayer from 'react-gif-player';
import { BackendLink } from '../../../utilits/BackendLink';

const DisplayImages = ({ message, handleOpen }) => {
    return (
        <Box>
            {message.images.length !== 0 ?
                <Box
                    sx={{
                        width: ["100%", "350px", "350px", "350px"]
                    }}
                >
                    {message.images.map((image, _) => {
                        return (
                            <Box
                                onClick={() => {
                                    handleOpen(BackendLink + image.image)
                                }}
                                key={image.id}
                            >
                                {image.image.endsWith(".gif") ?
                                    <ReactGifPlayer
                                        gif={BackendLink + image.image}
                                        still={BackendLink + image.image}
                                        alt="GIF"
                                        autoplay={true}
                                    /> :
                                    <img
                                        style={{
                                            marginBottom: "7px",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }}
                                        key={image.id}
                                        src={BackendLink + image.image}
                                    />
                                }
                            </Box>
                        )
                    })}
                </Box> :
                <Box></Box>
            }
        </Box>
    )
}

export default DisplayImages