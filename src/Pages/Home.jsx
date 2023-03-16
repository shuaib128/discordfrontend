import React from 'react'
import { Box } from '@mui/system';
import MessageInputBox from '../components/Message/MessageInputBox'
import MessageTop from '../components/Message/MessageTop';

function Home() {
    return (
        <Box 
            sx={{
                position: "relative",
                height: "100vh"
            }}
        >
            <MessageTop />
            <MessageInputBox />
        </Box>
    )
}

export default Home