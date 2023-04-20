import React from 'react'
import { Box } from '@mui/system'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const ImagePreview = ({ File, removeItem }) => {
    return (
        <Box
            sx={{
                position: "absolute",
                bottom: "118px",
                left: "25px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
                backgroundColor: "#383a40",
                padding: "20px 20px",
                width: "calc(100% - 72px)",
                overflowX: "scroll"
            }}
        >
            {File && File.map((image, index) => {
                return (
                    <Box>
                        <IconButton
                            color="primary"
                            aria-label="open menu"
                            sx={{
                                position: "relative",
                                cursor: "pointer",
                                float: "right"
                            }}
                            onClick={() => {
                                removeItem(index);
                            }}
                        >
                            <DeleteIcon
                                style={{ color: "#f46f3e", width: "30px" }}
                            />
                        </IconButton>
                        <img
                            style={{
                                width: "150px",
                                height: "auto",
                                borderRadius: "4px"
                            }}
                            key={index}
                            src={image}
                        />
                    </Box>
                )
            })}
        </Box>
    )
}

export default ImagePreview