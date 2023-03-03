import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/system';

const AvatarComponent = ({ image }) => {
    const [Hover, setHover] = useState(false)

    return (
        <Box sx={{
            marginTop: "15px",
            cursor: "pointer"
        }}>
            <Avatar
                alt="Remy Sharp"
                src={image}
                sx={{
                    width: 50, 
                    height: 50, 
                    borderRadius: Hover ? "15px" : 100,
                    transition: ".5s"
                }}
                onMouseEnter={() => setHover(!Hover)}
                onMouseLeave={() => setHover(!Hover)}
            />
        </Box>
    )
}

export default AvatarComponent