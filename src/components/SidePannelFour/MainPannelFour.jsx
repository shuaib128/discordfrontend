import React from 'react'
import { Box } from '@mui/system'
import { Orange } from '../../utilits/Colors/Colors'
import Avatar from '@mui/material/Avatar';
import { StyledBadge } from '../SidePannelTwo/ActiveIndicatorAvatar'
import About from './About';
import { useSelector } from 'react-redux'
import { BackendLink } from '../../utilits/BackendLink';

const MainPannelFour = () => {
    const SelectedUser = useSelector(state => state.SelectedUser.SelectedUser)

    return (
        <Box
            sx={{
                width: ["100%", "350px", "350px", "350px"],
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
                        src={SelectedUser && BackendLink + SelectedUser.profile_picture}
                        sx={{
                            width: "80px",
                            height: "80px",
                            border: `7px solid #232428`
                        }}
                    />
                </StyledBadge>
            </Box>

            <About 
                SelectedUser={SelectedUser}
            />
        </Box>
    )
}

export default MainPannelFour