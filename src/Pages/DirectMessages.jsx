import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { BackendLink } from '../utilits/BackendLink';

const DirectMessages = () => {
    const [message, setMessage] = useState('hey');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = new WebSocket(
            `ws://127.0.0.1:8000/ws/chat/useroneshuiab/usertwosam/`
        );
        setSocket(newSocket);
        return () => newSocket.close();
    }, []);

    const handleSubmit = () => {
        // Send a message to the server
        socket.send(JSON.stringify({ message }));
    };

    return (
        <Box>
            hey
            <button onClick={handleSubmit}>Send</button>
        </Box>
    )
}

export default DirectMessages