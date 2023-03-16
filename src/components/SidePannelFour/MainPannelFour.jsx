import React from 'react'
import { Box } from '@mui/system'
import { Orange } from '../../utilits/Colors/Colors'
import Avatar from '@mui/material/Avatar';
import { StyledBadge } from '../SidePannelTwo/ActiveIndicatorAvatar'
import About from './About';
import CommonServersFriends from './CommonServersFriends';

const MainPannelFour = () => {
    return (
        <Box
            sx={{
                width: "350px",
                height: "100%"
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "130px",
                    backgroundColor: Orange
                }}
            />

            <Box
                sx={{
                    position: "relative",
                    top: "-40px",
                    left: "20px"
                }}
            >
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    variant="dot"
                    sx={{
                        cursor: "pointer"
                    }}
                >
                    <Avatar
                        alt="Remy Sharp"
                        src="https://images.pexels.com/photos/15580815/pexels-photo-15580815.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                        sx={{
                            width: "80px", 
                            height: "80px",
                            border: `7px solid #232428`
                        }}
                    />
                </StyledBadge>
            </Box>

            <About />
            <CommonServersFriends />
        </Box>
    )
}

export default MainPannelFour