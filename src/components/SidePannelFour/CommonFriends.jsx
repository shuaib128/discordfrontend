import React, { useState } from 'react'
import { Box } from '@mui/system'
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material'
import { BlackLightMore } from '../../utilits/Colors/Colors';
import { StyledBadge } from '../SidePannelTwo/ActiveIndicatorAvatar';

const CommonFriends = ({ Name, Image }) => {
    const [Hovered, setHovered] = useState(false)

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                cursor: "pointer",
                backgroundColor: Hovered ? BlackLightMore : "",
                padding: "6px 6px",
                borderRadius: 1.3,
                transition: ".5s"
            }}
            onMouseEnter={() => setHovered(!Hovered)}
            onMouseLeave={() => setHovered(!Hovered)}
        >
            <StyledBadge
                overlap="circular"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                variant="dot"
            >
                <Avatar
                    alt="Remy Sharp"
                    src={Image}
                />
            </StyledBadge>

            <Typography
                variant="subtitle2"
                gutterBottom
                color='black'
                ml='15px'
            >
                carlos.dev2002
            </Typography>
        </Box>
    )
}

export default CommonFriends