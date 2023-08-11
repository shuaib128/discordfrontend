import React from 'react'
import { Box } from '@mui/system'
import { BackendLink } from '../../../utilits/BackendLink'
import { imageOrVideo } from '../../../utilits/Image/imageOrVideo'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ImagePreview = ({ File, setFile }) => {
    const removeFileItem = (index) => {
        const newItems = File.filter((_, i) => i !== index);

        setFile(newItems);
    }

    return (
        <Box
            className="image-preview"
            sx={{
                py: "12px",
                display: "flex",
                gap: "13px",
                flexWrap: "wrap",
                position: "absolute",
                bottom: "108px",
                left: "15px",
                width: ["100%", "100%", "70%", "70%"],
                overflowY: "scroll",
                maxHeight: "calc(100% - 287px)"
            }}
        >
            {File && File.map((file, index) => {
                const filename = file.name ? file.name : file.file
                const filePath = file.name ? URL.createObjectURL(file) : BackendLink + file.file

                if (imageOrVideo(filename) === "image") {
                    return (
                        <Box
                            key={index}
                            sx={{
                                position: "relative"
                            }}
                        >
                            <IconButton
                                color="primary"
                                aria-label="open menu"
                                sx={{
                                    position: "absolute",
                                    cursor: "pointer",
                                    float: "right",
                                    top: "-7px",
                                    right: "-4px",
                                    backgroundColor: "white",
                                    "&:hover": {
                                        backgroundColor: "#e4e4e4",
                                    }
                                }}
                                onClick={() => {
                                    removeFileItem(index)
                                }}
                            >
                                <CloseIcon
                                    style={{
                                        color: "#757a91",
                                        width: "14px",
                                        height: "14px"
                                    }}
                                />
                            </IconButton>
                            <img
                                src={filePath}
                                alt="prv-img"
                                style={{
                                    width: "135px",
                                    height: "103px",
                                    borderRadius: "0.5rem"
                                }}
                            />
                        </Box>
                    )
                } else if (imageOrVideo(filename) === "video") {
                    return (
                        <Box
                            key={index}
                            sx={{
                                position: "relative"
                            }}
                        >
                            <IconButton
                                color="primary"
                                aria-label="open menu"
                                sx={{
                                    position: "absolute",
                                    cursor: "pointer",
                                    float: "right",
                                    top: "-7px",
                                    right: "-4px",
                                    backgroundColor: "white",
                                    zIndex: "2",
                                    "&:hover": {
                                        backgroundColor: "#e4e4e4",
                                    }
                                }}
                                onClick={() => {
                                    removeFileItem(index)
                                }}
                            >
                                <CloseIcon
                                    style={{
                                        color: "#757a91",
                                        width: "14px",
                                        height: "14px"
                                    }}
                                />
                            </IconButton>
                            <video
                                controls
                                style={{
                                    width: "135px",
                                    height: "103px",
                                    borderRadius: "0.5rem"
                                }}
                            >
                                <source src={filePath} />
                            </video>
                        </Box>
                    )
                }
            })}
        </Box>
    )
}

export default ImagePreview