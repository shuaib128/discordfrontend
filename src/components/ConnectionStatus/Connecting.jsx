import React, { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import { Box } from '@mui/system';

const Connecting = () => {
    const [isComponentVisible, setIsComponentVisible] = useState(false);

    useEffect(() => {
        /**Delay rendering the component for some seconds */
        const timer = setTimeout(() => {
            setIsComponentVisible(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    /**Remove the connection status after some seconds */
    return (
        <Box className="connection-status">
            {!isComponentVisible &&
                <Alert
                    severity="info"
                    sx={{ padding: "0px 20px", borderRadius: "0px" }}
                >
                    Connecting
                </Alert>
            }
        </Box>
    )
}

export default Connecting