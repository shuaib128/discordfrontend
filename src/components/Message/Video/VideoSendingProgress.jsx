import React from 'react'
import { Box } from '@mui/system';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

const VideoSendingProgress = ({ VideoFileName, VideoFileSentPercentage }) => {
    return (
        <Box
            sx={{
                width: ["100%", "100%","calc(100% - 38px)", "calc(100% - 38px)"],
                position: "absolute",
                top: "57px",
                bgcolor: "rgb(229, 246, 253)",
                paddingX: "15px",
                paddingTop: "5px",
                paddingBottom: "15px",
                borderRadius: "3px",
            }}
        >
            <Typography
                variant="button"
                display="block"
                gutterBottom
                mt={0}
            >
                {VideoFileName.slice(0, 15)}...
            </Typography>
            <LinearProgress
                variant="determinate"
                value={VideoFileSentPercentage}
            />
        </Box>
    )
}

export default VideoSendingProgress