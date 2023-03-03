import React from 'react'
import { Box } from '@mui/system'
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material'
import { StyledBadge } from './ActiveIndicatorAvatar';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';

const User = () => {
    return (
        <Box
            sx={{
                position: "absolute",
                bottom: "33px",
                display: "flex",
                alignItems: "center",
                width: "calc(100% - 20px)",
                justifyContent: "space-between",
                backgroundColor: "#232428",
                left: 0,
                padding: "10px",
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
                >
                    <Avatar
                        alt="Remy Sharp"
                        src={Image}
                    />
                </StyledBadge>

                <Typography
                    variant="subtitle2"
                    gutterBottom
                    color='white'
                    ml='13px'
                >
                    {"shuiab.ahamed.223".slice(0, 10)}...
                </Typography>
            </Box>

            <Box>
                <Button>
                    <SettingsIcon
                        style={{ color: "white", width: "20px" }}
                    />
                </Button>
            </Box>
        </Box>
    )
}

export default User