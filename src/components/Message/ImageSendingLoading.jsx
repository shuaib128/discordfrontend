import React from 'react'
import { Box } from '@mui/system';
import LinearProgress from '@mui/material/LinearProgress';

const ImageSendingLoading = () => {
    return (
        <Box
            sx={{
                width: "calc(100% - 60px)",
                margin: "0 auto",
                position: "relative",
                bottom: ["10px", "10px", "0px", "0px"]
            }}
        >
            <LinearProgress />
        </Box>
    )
}

export default ImageSendingLoading