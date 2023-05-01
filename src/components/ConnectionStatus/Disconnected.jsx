import React from "react";
import Alert from '@mui/material/Alert';
import { Box } from '@mui/system';

const Disconnected = () => {
    /**Remove the connection status after some seconds */
    return (
        <Box className="connection-status">
            <Alert
                severity="error"
                sx={{ padding: "0px 20px", borderRadius: "0px" }}
            >
                Disconnected
            </Alert>
        </Box>
    )
}

export default Disconnected