import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material'
import { StyledBadge } from './ActiveIndicatorAvatar';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import FetchData from '../../utilits/Data/FetchData';
import { getUser } from '../../redux/Profile/ProfileActions';
import { BackendLink } from '../../utilits/BackendLink';
import Popover from '@mui/material/Popover';
import Logout from '../../utilits/Logout';
import { GetToken } from '../../utilits/Token/GetToken';

const User = () => {
    const refreshToken = GetToken().refreshToken;
    const accessToken = GetToken().accessToken;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const user = useSelector(state => state.Profile.User)
    const Loading = useSelector(state => state.Profile.Loading)

    //Data to send for logout
    const data = {
        accessToken: accessToken,
        refreshToken: refreshToken
    }

    //Get user data
    useEffect(() => {
        FetchData("/api/users/user/").then(data => {
            dispatch(getUser(data))
        });
    }, []);

    //---------------Handele modal----------------------
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    //---------------Handele modal----------------------

    return (
        <Box
            sx={{
                position: "absolute",
                bottom: ["46px", "46px", "33px", "33px"],
                display: "flex",
                alignItems: "center",
                width: "calc(100% - 28px)",
                justifyContent: "space-between",
                backgroundColor: "#232428",
                left: 0,
                padding: "14px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
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
                    onClick={handleClick}
                >
                    <Avatar
                        alt={user.username}
                        src={`${BackendLink}${user.profile_picture}`}
                    />
                </StyledBadge>

                <Typography
                    variant="subtitle2"
                    gutterBottom
                    color='white'
                    ml='13px'
                >
                    {user.username}
                </Typography>
            </Box>

            <Box>
                <Button
                    onClick={() => {
                        navigate("/settings")
                    }}
                >
                    <SettingsIcon
                        style={{ color: "white", width: "20px" }}
                    />
                </Button>
            </Box>

            {/* Modal */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Button variant="contained" color="error"
                    onClick={() => Logout(
                        "/api/users/user/logout/", 
                        data,
                        navigate
                    )}
                >
                    Log Out
                </Button>
            </Popover>
        </Box>
    )
}

export default User